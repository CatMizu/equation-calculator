const nerdamer = require('nerdamer/all.min');
const { User, Equation, Parameter } = require('../models');

/**
 * Create a equation
 * @param {Object} latex
 * @param {number} userId
 * @returns {Promise<Equation>}
 */
const createEquation = async (latex, userId) => {
  const equation = await Equation.create({ latex, user: userId });
  return equation.toJSON();
};

/**
 * Create Parameters
 * @param {Object} parameters
 * @param {number} equationId
 * @returns {Promise<Array<Parameter>>}
 */
const createParameters = async (parameters, equationId) => {
  const createdParameters = await Promise.all(
    Object.entries(parameters).map(([name, value]) => Parameter.create({ name, value, equation: equationId }))
  );
  return createdParameters.map((parameter) => parameter.toJSON());
};

/**
 * Solve a equation
 * @param {string} latexString
 * @param {Object} parameters
 * @param {string} solveFor
 * @returns {Promise<string>}
 */
const solveEquation = async (latexString, parameters, solveFor) => {
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
      },
    ],
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Adjusting the structure of the result
  const result = user.equations.map((equation) => {
    return {
      latex: equation.latex,
      parameters: equation.parameters.reduce((obj, parameter) => {
        obj[parameter.name] = parameter.value;
        return obj;
      }, {}),
    };
  });

  return result;
};

module.exports = {
  createEquation,
  createParameters,
  solveEquation,
  getEquationsByUserId,
};
