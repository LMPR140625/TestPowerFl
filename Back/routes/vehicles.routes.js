/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - brand
 *         - model
 *         - year
*          - plate
 *         - stateid
 *       properties:
 *         brand:
 *           type: string
 *           description: Marca del vehículo
 *         model:
 *           type: string
 *           description: Modelo del vehículo
 *         year:
 *           type: string
 *           description: Año del vehículo
 *         plate:
 *           type: boolean
 *           description: Placa del vehículo
 *         stateid:
 *           type: string
 *           format: integer
 *           description: Id del estado del vehículo
 *       example:
 *         brand: Toyota
 *         model: Corolla
 *         year: 2020
 *         plate: TEST-0101
 *         stateid: 1
 *     IdVehicle:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           description: Id del vehículo
 *       example:
 *         id: 1
 */

/**
 * @swagger
 * tags:
 *   name: vehículos
 *   description: Administración de vehículos
 * /vehicle:
 *   get:
 *     summary: Recupera los vehículos en inventario
 *     security:
 *       - bearerAuth: {}
 *     tags: [vehículo]
 *     responses:
 *       200:
 *         description: Listado de vehículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *   post:
 *     summary: Registra un nuevo vehículo
 *     security:
 *       - bearerAuth: {}
 *     tags: [vehículo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Se registro el vehículo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: Some server error
 * 
 *   put:
 *    summary: Actualizar registro de vehículo por id
 *    security:
 *      - bearerAuth: {}
 *    tags: [vehículo]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id de vehículo
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Vehicle'
 *    responses:
 *      200:
 *        description: Registro actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: Problemas al actualizar
 *      500:
 *        description: Problemas con el servidor
 *   delete:
 *     summary: Eliminar registro vehicular por id
 *     security:
 *       - bearerAuth: {}
 *     tags: [vehículo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id de vehículo
 *
 *     responses:
 *       200:
 *         description: Registro vehicular eliminado
 *       404:
 *         description: Error al eliminar el vehículo
 *       500:
 *        description: Problemas con el servidor
 *
 */


import express from 'express'
import { GetVehicles, addVehicle, updVehicle, delVehicle, getVehicleId } from '../controllers/vehicles.controller.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router();

router.use(authMiddleware.authenticateToken);
router
    .route('/vehicle',)
    .get(GetVehicles)   
    .post(addVehicle)    

router
    .route('/vehicleId')
    .post(getVehicleId)
    .put(updVehicle)
    .delete(delVehicle)
export default router;