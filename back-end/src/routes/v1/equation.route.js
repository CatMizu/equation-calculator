const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const equationValidation = require('../../validations/equation.validation');
const equationController = require('../../controllers/equation.controller');

const router = express.Router();

router.route('/').post(auth(), validate(equationValidation.createEquation), equationController.createEquation);

router.route('/solve').post(auth(), validate(equationValidation.solveEquation), equationController.solveEquation);

router.route('/:userId').get(auth(), validate(equationValidation.getEquationsByUserId), equationController.getEquations);

module.exports = router;
