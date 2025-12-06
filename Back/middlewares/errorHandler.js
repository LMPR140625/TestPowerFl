

const handleCastErrorDB = err =>{
    const message = `Id inválido: ${err.path}: ${err.value}`;
}

// Manejor de errores
const erroHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(err.name === 'CastError') err = handleCastErrorDB(err);
   
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}

export default erroHandler;