/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - NameUser
 *         - PassHash
 *       properties:
 *         NameUser:
 *           type: string
 *           description: Nombre de usuario
 *         PassHash:
 *           type: string
 *           description: Contraseña de usuario
 *       example:
 *         NameUser: TEST
 *         PassHash: TESTPF2025$
 */
/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Inicio de sesión
 * /login:
 *   post:
 *     summary: Inicio de sesión
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     security:
 *       - {}
 *     responses:
 *       200:
 *         description: Usuario válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Problemas con el servidor
 */

import express from 'express';
import { login} from '../controllers/token.controller.js';


const router = express.Router();

router
    .route('/login')
    .post(login)
    export default router;