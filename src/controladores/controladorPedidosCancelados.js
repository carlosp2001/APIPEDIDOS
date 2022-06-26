const {validationResult} = require('express-validator');
const modeloPedidosCancelados = require('../modelos/modeloPedidosCancelados');

exports.Listar = async(req,res)=>{
        try {
            const lista = await modeloPedidosCancelados.findAll();
            console.log(lista);
            res.json(lista);
        } catch (error) {
            console.error(error);
            res.json(error);
        }
}

exports.Guardar = async (req, res)=>{
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje:''
    };
    if (validaciones.errors.length > 0){
        validaciones.errors.forEach(error =>{
            msj.mensaje +=error.msg + '. ';
        });
    }
    else{
        const {numeropedido, usuario} = req.body;
        try {
            await modeloPedidosCancelados.create({
                numeropedido: numeropedido, //izquierda, como esta en la tabla
                usuario: usuario
            });
            msj.mensaje = 'pedido cancelado correctamente';
        } catch (error) {
            msj.mensaje = 'error al crear un nuevo pedido cancelado'
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
        const {id} = req.query;
        const {usuario} = req.body;
        try { 
            var buscarPedido = await modeloPedidosCancelados.findOne({
                where: {
                    numeropedido : id //lado izquierdo tabla, derecho variables
                }
            });       
            if(!buscarPedido){
                msj.mensaje = 'No se ha encontrado un pedido cancelado con el ID ' + id;
            }
            else{
                buscarPedido.usuario = usuario;
                await buscarPedido.save();

                msj.mensaje = 'El pedido cancelado se actualizo correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al actualizar el pedido cancelado';
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
        const {id} = req.query; //la id es la que se envia en el query
        try { 
            var buscarPedido = await modeloPedidosCancelados.findOne({
                where: {
                    numeropedido: id
                }
            });       
            if(!buscarPedido){
                msj.mensaje = 'No se ha encontrado un pedido cancelado con el ID ' + id;
            }
            else{
                await buscarPedido.destroy({
                    where: {
                        numeropedido : id
                    }
                });
                msj.mensaje = 'Pedido cancelado eliminado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al borrar el pedido cancelado';
        }
    }
    res.json(msj.mensaje);
}