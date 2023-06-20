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

/**
 * @swagger
 * tags:
 *   name: Equations
 *   description: Euqation management and solve
 */

/**
 * @swagger
 * /equations/:
 *   post:
 *     summary: Create an equation
 *     tags: [Equations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latex:
 *                 type: string
 *                 description: The LaTeX representation of the equation to create
 *                 required: true
 *               parameters:
 *                 type: object
 *                 description: An object mapping variables in the equation to their respective values
 *                 additionalProperties:
 *                   type: number
 *                 nullable: true
 *             example:
 *               latex: "ax^2 + bx + c = 0"
 *               parameters: { "a": 1, "b": -3, "c": 2 }
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equation'
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Get all equations
 *     tags: [Equations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equation'
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /equation/solve:
 *   post:
 *     summary: Solve an equation
 *     tags: [Equations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latex:
 *                 type: string
 *                 description: The LaTeX representation of the equation to solve
 *                 required: true
 *               parameters:
 *                 type: object
 *                 description: An object mapping variables in the equation to their respective values
 *                 additionalProperties:
 *                   type: number
 *                 nullable: true
 *               solveFor:
 *                 type: string
 *                 description: The variable to solve for in the equation
 *                 pattern: "^[a-zA-Z]{1}$"
 *                 required: true
 *             example:
 *               latex: "x + y = 5"
 *               parameters: { "y": 3 }
 *               solveFor: "x"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "2"
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /equation/{id}:
 *   delete:
 *     summary: Delete an equation
 *     tags: [Equations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the equation to delete
 *         example: 1
 *     responses:
 *       "204":
 *         description: No content
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
