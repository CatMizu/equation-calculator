const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { equationService } = require('../services');

const createEquation = catchAsync(async (req, res) => {
  const equation = await equationService.createEquation(req.body.latex, req.body.parameters, req.user.id);
  res.status(httpStatus.CREATED).send({ equation });
});

const solveEquation = catchAsync(async (req, res) => {
  const solution = await equationService.solveEquation(req.body.latex, req.body.parameters, req.body.solveFor);
  res.send({ solution });
});

const getEquations = catchAsync(async (req, res) => {
  const equations = await equationService.getEquationsByUserId(req.user.id);
  res.send({ equations });
});

const deleteEquation = catchAsync(async (req, res) => {
  await equationService.deleteEquationById(req.user.id, req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEquation,
  solveEquation,
  getEquations,
  deleteEquation,
};
