import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();
// TODO: Database configuration
const config = {
  user: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  // Notice public keyword in the connection string 
  // if you were to host this server on Azure you wouldn't need the public part
  server: 'localhost',
  database: 'main_db',
};

// Connect to the database
sql.connect(config, (err) => {
  
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

export default sql.connect;