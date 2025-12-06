import express from 'express';
import { login} from '../controllers/token.controller.js';


const router = express.Router();

router
    .route('/login')
    .post(login)


    export default router;