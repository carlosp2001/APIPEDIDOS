const {validationResult} = require('express-validator');
function validar(req){
    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
    }
    var msj = {
        estado: 'correcto',
        mensaje: '',
        datos: '',
        errores: '',
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg
            error.parametro = element.param
            errores.push(error)
        });
        msj.estado = 'precaucion';
        msj.mensaje = 'La Peticion no se ejecuto';
        msj.errores = errores;
    }
    return msj;
}

module.exports = validar;