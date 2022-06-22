const { validationResult } = require('express-validator');
const modeloPedidos = require('../modelos/modeloPedidos');

//Funcion para obtener todos los pedidos de la tabla
exports.Listar = async (req, res) => { //async es para que espere a que se ejecute la funcion y le devuelta un resultado
    try {
        const lista = await modeloPedidos.findAll();
        console.log(lista);
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
    }
};

/* #Funcion para guardar un nuevo pedido que recibe mediante el body
#La fechas y el numero de pedido se genera automaticamente */
exports.Guardar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: ''
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });
    }
    else{
        const { idmesero, estacion, Estacion, activo, modalidad, estado } = req.body;
        const fechahora = Date.now();
        try {
            await modeloPedidos.create({
                idmesero: idmesero,
                fechahora: fechahora,
                estacion: estacion,
                Estacion: Estacion,
                activo: activo,
                modalidad: modalidad,
                estado: estado
            });
            msj.mensaje='Pedido almacenado correctamente';
        } 
        catch (error) {
            msj.mensaje='Error al guardar el pedido';
        }
            
    }
    res.json(msj);    
};
   
/* #Funcion para editar un pedido existente segun el NumeroPedido que se envia en el Parametro id de la url
#Valida que exista el id del pedido para poder editarlo
#La fecha se actualiza automaticamente */
exports.Editar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: ''
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });
    }
    else{
        const { id } = req.query;
        const { idmesero, estacion, Estacion, activo, modalidad, estado } = req.body;
        const fechahora = Date.now();
        try {
            var buscarPedido = await modeloPedidos.findOne({
                where: {
                    NumeroPedido: id
                }
            });
            if(!buscarPedido){
                msj.mensaje='El Numero del pedido no existe';
            }
            else{
                buscarPedido.idmesero = idmesero;
                buscarPedido.fechahora = fechahora;
                buscarPedido.estacion = estacion;
                buscarPedido.Estacion = Estacion;
                buscarPedido.activo = activo;
                buscarPedido.modalidad = modalidad;
                buscarPedido.estado = estado;
                await buscarPedido.save();
                msj.mensaje='Pedido editado correctamente';
            }            
        } 
        catch (error) {
            msj.mensaje='Error al editar el pedido';
        }
            
    }
    res.json(msj);
};

/* 
#Funcion que elimina un pedido segun el NumeroPedido que se envia en el Parametro id de la url
#Valida que exista el id del pedido  para eliminarlo */
exports.Eliminar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: ''
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });
    }
    else{
        const { id } = req.query;
        try {
            var buscarPedido = await modeloPedidos.findOne({
                where: {
                    NumeroPedido: id
                }
            });
            if(!buscarPedido){
                msj.mensaje='El Numero del pedido no existe';
            }
            else{
                await buscarPedido.destroy({
                    where: {
                        NumeroPedido: id
                    }
                });
                msj.mensaje='Pedido eliminado correctamente';
            }            
        } 
        catch (error) {
            msj.mensaje='Error al eliminar el pedido';
        }
            
    }
    res.json(msj);
};