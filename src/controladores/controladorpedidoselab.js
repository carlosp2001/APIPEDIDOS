const {validationResult} = require('express-validator');
//se usa el modelo creado, lo llamamos dentro de una variable
const modeloPedidosElaborados = require('../modelos/modeloPedidosElaborados');


//en el controlador se crean las funciones (CRUD)

exports.Listar = async(req, res) => {
    try {
        const lista = await modeloPedidosElaborados.findAll();//con el findall le indicamos que busque todos los datos
        console.log(lista);
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
}

exports.Guardar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(error => {
            msj.mensaje += error.msg + '. ';
        });
    }else{
        const {iddetallepedido, idusuario} = req.body;
        try {            
            await modeloPedidosElaborados.create({
                iddetallepedido: iddetallepedido, //izquierda=identico a la tabla //derecha=es la variable que le declaramos en la linea 30
                idusuario: idusuario //izquierda=identico a la tabla //derecha=es la variable que le declaramos en la linea 30
            });
            msj.mensaje = 'Cargo guardado correctamente';
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
        }
    }
    res.json(msj.mensaje);
}

exports.Editar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(error => {
            msj.mensaje += error.msg + '. ';
        });
    }else{
        const {id} = req.query; //es la variable que declaramos en el thunder
        const {idusuario} = req.body;
        try { 
            var buscardetalle = await modeloPedidosElaborados.findOne({//con el findone le indicamos que busque solo un dato
                where: {
                    iddetallepedido: id //le indicamos que busque el dato por medio del que indicamos en el query del thunder
                }
            });       
            if(!buscardetalle){//el signo de admiracion significa si esta vacio o es false
                msj.mensaje = 'No se ha encontrado un detalle pedido con el ID ' + id;
            }
            else{
                buscardetalle.idusuario = idusuario;
                await buscardetalle.save();

                
                msj.mensaje = 'Detalle pedido actualizado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
        }
    }
    res.json(msj.mensaje);
}

exports.Eliminar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(error => {
            msj.mensaje += error.msg + '. ';
        });
    }else{
        const {id} = req.query;
        try { 
            var buscardetalle = await modeloPedidosElaborados.findOne({
                where: {
                    iddetallepedido: id
                }
            });       
            if(!buscardetalle){
                msj.mensaje = 'No se ha encontrado un detalle pedido con el ID ' + id;
            }
            else{
                await buscardetalle.destroy({
                    where: {
                        iddetallepedido: id
                    }
                });
                msj.mensaje = 'Datalle pedido eliminado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al borrar el detalle pedido';
        }
    }
    res.json(msj.mensaje);
}