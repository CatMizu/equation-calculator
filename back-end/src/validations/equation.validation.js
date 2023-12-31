const Joi = require('joi');

const createEquation = {
  body: Joi.object().keys({
    latex: Joi.string().required(),
    parameters: Joi.object()
      .pattern(/^[a-zA-Z]{1}$/, Joi.number())
      .allow(null),
  }),
};

const solveEquation = {
  body: Joi.object().keys({
    latex: Joi.string().required(),
    parameters: Joi.object()
      .pattern(/^[a-zA-Z]{1}$/, Joi.number())
      .allow(null),
    solveFor: Joi.string()
      .pattern(/^[a-zA-Z]{1}$/)
      .required(),
  }),
};

const deleteEquation = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createEquation,
  solveEquation,
  deleteEquation,
};
