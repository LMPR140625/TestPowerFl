const customeResponse = (req, res, next) => {
    // Metodo para respuestas exitosas
    res.success = (statusCode, data, message = 'Operación exitosa') => {
        res.status(statusCode).json({
            status: 'success',
            message,
            data,
        });
    };

    // Metodo para respuestas de error
    res.error = () => {
        res.status(statusCode).json({
            status: 'error',
            message,
            data,
        });
    };
    next();
};

export default customeResponse;