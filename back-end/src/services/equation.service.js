const nerdamer = require('nerdamer/all.min');
const { User, Equation, Parameter } = require('../models');
const sequelize = require('../config/database');

/**
 * Create Parameters
 * @param {Object} parameters
 * @param {number} equationId
 * @returns {Promise<Object>}
 */
const createParameters = async (parameters, equationId) => {
  await Promise.all(
    Object.entries(parameters).map(([name, value]) => Parameter.create({ name, value, equation: equationId }))
  );
  return parameters;
};

/**
 * Create a equation
 * @param {Object} latex
 * @param {number} userId
 * @param {Object} parameters
 * @returns {Promise<Equation>}
 */
const createEquation = async (latex, parameters, userId) => {
  const equation = await Equation.create({ latex, user: userId });
  let createdParameters = null;
  if (parameters) {
    createdParameters = await createParameters(parameters, equation.id);
  }
  const equationJson = equation.toJSON();
  equationJson.parameters = createdParameters;
  return equationJson;
};

/**
 * Solve a equation
 * @param {string} latexString
 * @param {Object} parameters
 * @param {string} solveFor
 * @returns {string}
 */
const solveEquation = (latexString, parameters, solveFor) => {
  let equationString = nerdamer.convertFromLaTeX(latexString);

  // simplify with parameter values
  equationString = nerdamer(equationString, parameters);
  // solve the equation
  let solution = nerdamer.solve(equationString, solveFor).toString();
  // clean the format
  if (solution.startsWith('[') && solution.endsWith(']')) {
    solution = solution.substring(1, solution.length - 1);
  }

  return nerdamer.convertToLaTeX(solution);
};

const getEquationsByUserId = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Equation,
        as: 'equations',
        include: [
          {
            model: Parameter,
            as: 'parameters',
          },
        ],
        order: [['createdAt', 'DESC']],
      },
    ],
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Adjusting the structure of the result
  const result = user.equations.map((equation) => {
    return {
      id: equation.id,
      latex: equation.latex,
      parameters: equation.parameters.reduce((obj, parameter) => {
        obj[parameter.name] = parameter.value;
        return obj;
      }, {}),
    };
  });

  return result;
};

/**
 * Delete a equation by userId and equationId
 * @param {number} userId
 * @param {number} equationId
 * @returns {Promise}
 */
const deleteEquationById = async (userId, equationId) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const equation = await Equation.findByPk(equationId);
    if (!equation) throw new Error('Equation not found');

    if (equation.user !== user.id) throw new Error('The equation does not belong to the user');

    await Parameter.destroy({
      where: { equation: equationId },
      transaction,
    });

    await Equation.destroy({
      where: { id: equationId },
      transaction, // Use the transaction here
    });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  createEquation,
  createParameters,
  solveEquation,
  getEquationsByUserId,
  deleteEquationById,
};
