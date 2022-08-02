const {validationResult} = require('express-validator');
function validar(req){
    const validaciones = validationResult(req);
    var errores = [];
    var msj = {
        estado: 'correcto',
        mensaje: '',
        datos: '',
        errores: '',
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            errorMP=new Object();
            errorMP.mensaje = element.msg
            errorMP.parametro = element.param            
            errores.push(errorMP)
        });
        console.log(errores)
        
        msj.estado = 'precaucion';
        msj.mensaje = 'La Peticion no se ejecuto';
        msj.errores = errores;
    }
    return msj;
}

module.exports = validar;