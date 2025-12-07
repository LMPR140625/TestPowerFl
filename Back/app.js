import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import vehicleRoutes from './routes/vehicles.routes.js'
import loginRoutes from './routes/login.routes.js'
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import authMiddleware from './middlewares/auth.js'
import morgan from 'morgan';
import customResponse from './middlewares/customResponse.js';
import xss from 'xss-clean';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
// Limitar perticiones para prevenir ataques de fuerza bruta
/* const limiter = rateLimit({
  max:100,
  windowMs: 60 * 60 * 1000,
  message: 'Demasiadas peticiones desde esta IP, intente dentro de 1 hora '
});
// Body parser lectura de datos de las peticiones en el body
app.use(express.json({limit:'10kb'}));
app.use('/api',limiter); */

app.use(express.json());

 app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query }, // Create a new mutable object from the existing query
    writable: true,           // Make the new 'query' property writable
    configurable: true        // Allow the property to be redefined later if needed
  });
  next();
});

// Middleware para sanear la entrada contra ataques XSS
// Aplícalo antes de tus rutas
app.use(xss());

// Seguridadd: Helmet y sanitización
app.use(helmet());

app.use(hpp());

// Habilitación de cors
const corsOptions = {
  origin: ['https://green-pebble-0de6a5b0f.3.azurestaticapps.net'], // Specify allowed origins
  optionsSuccessStatus: 200 // For legacy browser support
};


// Prod
app.use(cors(corsOptions)); // Enable CORS with specified options

// Registro de peticion logs
app.use(morgan('dev'));

// Respuesta personalizado
app.use(customResponse);

// Routes
app.use('/api/',loginRoutes);
//app.use(authMiddleware.authenticateToken)
app.use('/api/',vehicleRoutes);

/*
app.all('*',(req,res,next) => {
  next(new AppError(`No se puede encontrar ${req.originalUrl} en este servidor`,404));
});*/

app.use(errorHandler);


export default app;