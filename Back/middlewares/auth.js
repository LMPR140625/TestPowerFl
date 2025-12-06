// authMiddleware.js
import  jwt  from 'jsonwebtoken';
import bcrypt  from 'bcryptjs';
import { validateUser } from '../services/loginService.js';
// Define tu secreto de firma (guárdalo en variables de entorno en producción)
const secretKey = 'tu_clave_secreta_super_segura'; 

const generateToken = async (username, password) => {
  const user = await validateUser(username, password);

  if (user.length == 0) {
    return null; // Usuario no encontrado
  }
  
  const passHashBuffer = user[0].PASSHASH;
  const passString = passHashBuffer.toString('utf8');
   // Compara la contraseña proporcionada con el hash almacenado
  const isMatch = password === passString ? true : false;
  

  if (!isMatch) {
    return null; // Contraseña incorrecta
  }
console.log("resultado de isMatch", isMatch)
  // Si es válido, crea el token JWT
  const token = jwt.sign(
    // Payload: Datos que quieres almacenar en el token
    { userId: user.ID, username: user.IDUSER },
    // Clave secreta (debe ser privada)
    secretKey,
    // Opciones: Define la expiración del token
    { expiresIn: '24h' } // El token expira en 1 hora
  );

  return token;
};

/**
 * Middleware para verificar JWT en rutas protegidas.
 */
const authenticateToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    // El formato esperado es "Bearer TOKEN"
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) {
        // Si no hay token, el acceso es denegado (401 Unauthorized)
        return res.sendStatus(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    // 2. Verificar el token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
           
            // Si el token no es válido (ej. expirado, firma incorrecta), es prohibido (403 Forbidden)
            return res.sendStatus(403).json({ message: 'Token inválido o expirado.' });
        }
        
        // 3. Si es válido, adjuntar los datos del usuario al objeto de solicitud
        req.user = user; 
        
        // 4. Continuar con la siguiente función de middleware/controlador
        next(); 
    });
};

// Exportamos el middleware y la clave secreta para usarla también al generar tokens
export default {
    authenticateToken,
    secretKey,
    generateToken
};