const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { equationService } = require('../services');
const ApiError = require('../utils/ApiError');

const createEquation = catchAsync(async (req, res) => {
  const equation = await equationService.createEquation(req.body.latex, req.user.id);
  let parameters;
  if (req.body.parameters) {
    parameters = await equationService.createParameters(req.body.parameters, equation.id);
  }
  res.status(httpStatus.CREATED).send({ equation, parameters });
});

const solveEquation = catchAsync(async (req, res) => {
  const solution = await equationService.solveEquation(req.body.latex, req.body.parameters, req.body.solveFor);
  res.send({ solution });
});

const getEquations = catchAsync(async (req, res) => {
  const { userId } = req.params;
  if (userId !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const equations = await equationService.getEquationsByUserId(userId);
  res.send({ equations });
});

module.exports = {
  createEquation,
  solveEquation,
  getEquations,
};
