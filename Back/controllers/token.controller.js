import  authenticateToken  from '../middlewares/auth.js';
import catchAsync from '../utils/catchAsync.js';

export const login = catchAsync(async (req, res, next) => {
   const { NameUser, PassHash } = req.body;

    if (!NameUser || !PassHash) {
        return res.status(400).json({ message: 'Se requieren usuario y contraseña.' });
    }

    const token = await authenticateToken.generateToken(NameUser, PassHash);

    if(token == null ) res.success(200,null,"Usuario Incorrecto");
    else res.success(200,token,"Login exitoso");
});

