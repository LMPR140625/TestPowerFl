// config/config.js
import 'dotenv/config'; 
import app from './app.js';
import fs from 'fs';
import https from 'https';
import http from 'http';
import config from './config/config.js';
import swaggerJSDoc from 'swagger-jsdoc'; 
import swaggerUi from 'swagger-ui-express'
import vehicle from './models/vehicleModel.js';
import sql from 'mssql';



// Conectar a la base de datos
const configDB = {
  user: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  // Notice public keyword in the connection string 
  // if you were to host this server on Azure you wouldn't need the public part
  server: process.env.SQLSERVER_SERVER,
  database: process.env.SQLSERVER_DATABASE,
  options: {
    // THIS IS VERY IMPORTANT - Public endpoint is 3342, default is 1443
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




const port = config.port;

// Swagger definition

const swaggerOptions = {
  swaggerDefinition:{
    openapi: '3.0.0',
    info:{
      title:'Vehicle_API',
      version:'1.0.0',
      description:'API documentation for VEHICLE API JLPG',
    },
    servers:[{
      url:`http://localhost:3009`
    }],
    components:{
      schema:{
        vehicle: {}
      },
      
    }
  },
  apis:['./routes/*.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

// Configuración de certificados

/* const options = {
  key: fs.readFileSync('../certificates/dev_certificate.key'),
  cert: fs.readFileSync('../certificates/dev_certificate.crt')
};
 */

http.createServer(app).listen(port, () => {
  console.log(`Node.js app listening on  port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});