const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const equationValidation = require('../../validations/equation.validation');
const equationController = require('../../controllers/equation.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(equationValidation.createEquation), equationController.createEquation)
  .get(auth(), equationController.getEquations);

router.route('/solve').post(auth(), validate(equationValidation.solveEquation), equationController.solveEquation);

router.route('/:id').delete(auth(), validate(equationValidation.deleteEquation), equationController.deleteEquation);

module.exports = router;
