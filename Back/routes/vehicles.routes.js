
import express from 'express'
import { GetVehicles, addVehicle, updVehicle, delVehicle, getVehicleId } from '../controllers/vehicles.controller.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router();

router.use(authMiddleware.authenticateToken);
router
    .route('/vehicle',)
    .get(GetVehicles)
/**
 * @swagger
 * tags:
 *   name: Vehiculo
 *   description: Operaciones de gestión de vehiculos
 *
 * /addVehicule:
 *   post:
 *     summary: Registrar un nuevo vehiculo
 *     tags: [Agregar registro de vehiculo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './routes/vehiclesModel.js'
 *     responses:
 *       201:
 *         description: Sale creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './routes/vehiclesModel.js'
 */     
    .post(addVehicle)
    

router
    .route('/vehicleId')
    .post(getVehicleId)
    .put(updVehicle)
    .delete(delVehicle)
export default router;