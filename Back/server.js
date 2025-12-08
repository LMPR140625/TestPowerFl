// config/config.js
import 'dotenv/config'; 
import app from './app.js';
import fs from 'fs';
import https from 'https';
import http from 'http';
import config from './config/config.js';
import swaggerJSDoc from 'swagger-jsdoc'; 
import swaggerUi from 'swagger-ui-express'

import sql from 'mssql';
// Conectar a la base de datos
const configDB = {
  user: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  server: process.env.SQLSERVER_SERVER,
  database: process.env.SQLSERVER_DATABASE,
  options: {
    port: 1433, 
    encrypt: true,
    trustServerCertificate: true
  },
};

// Connect to the database
sql.connect(configDB, (err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

const port = process.env.PORT;

// Swagger definition

const swaggerOptions = {
  swaggerDefinition:{
    openapi: '3.0.0',
    info:{
      title:'Vehicle_API',
      version:'1.0.0',
      description:'API documentation for VEHICLE API JLPG',
      contact: {
        name: "José Luis Plata",
        url: "https://joseluisplatagonzalezservices.com/",
        email: "jlpg-lrm-lmpr@gmail.com",
      },
    },
    servers:[{
      url:`https://backpowerfleet-e6e4eub9akf9ecbd.mexicocentral-01.azurewebsites.net/api`
      //url:`http://localhost:3000/api`
    }],
    components: {
      securitySchemes: { 
        bearerAuth: {
          type: 'https',
          scheme: 'bearer',
          bearerFormat: 'JWT', 
          description: 'Ingresa tu token JWT con el pregijo "Bearer "'
        },
      },
    },
  },
  apis:['./routes/*.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs,{explorer: true}));

// Configuración de certificados

/* const options = {
  key: fs.readFileSync('../certificates/dev_certificate.key'),
  cert: fs.readFileSync('../certificates/dev_certificate.crt')
};
 */

http.createServer(app).listen(port, () => {
  console.log(`Node.js app listening on  port ${port}`);
  console.log(`Swagger UI available at https://backpowerfleet-e6e4eub9akf9ecbd.mexicocentral-01.azurewebsites.net/api-docs`);
});