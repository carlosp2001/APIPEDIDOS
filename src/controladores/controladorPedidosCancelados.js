//modulo trabajado por francis lara.
const {validationResult} = require('express-validator');
const modeloPedidosCancelados = require('../modelos/modeloPedidosCancelados');

exports.Inicio = async (req, res) => {
    const listaModulos = [
        {
            modulo:"PedidosCancelados",
            ruta:"/api/pedidos/pedidosCancelados",
            metodo:"GET",
            parametros:"",
            descripcion:"Inicio del módulo PedidosCancelados"
        },
        {
            modulo:"PedidosCancelados",
            ruta:"/api/pedidos/pedidosCancelados/listar",
            metodo:"GET",
            parametros:"",
            descripcion:"Lista todos los Pedidos cancelados"
        },
        {
            modulo:"PedidosCancelados",
            ruta:"/api/pedidos/pedidosCancelados/guardar",
            metodo:"POST",
            parametros:"numeropedido,usuario",
            descripcion:"Guarda un detalle de un Pedido Cancelado"
        },
        {
            modulo:"PedidosCancelados",
            ruta:"/api/pedidos/pedidosCancelados/editar",
            metodo:"PUT",
            query:"id",
            parametros:"usuario",
            descripcion:"Actualiza un pedido cancelado"
        },
        {
            modulo:"PedidosCancelados",
            ruta:"/api/pedidos/pedidosCancelados/eliminar",
            metodo:"DELETE",
            query:"id",
            descripcion:"Elimina un pedido Cancelado"
        }
    ]
    const datos = {
        api:"API-SIGRES",
        segmento:"Pedidos Cancelados",
        descripcion:"CRUD para PedidosCancelados",
        propiedad:"Sistemas SIGRES",
        desarrollador:"Francis Joe Lara Chavez",
        colaboradores:"",
        fecha:"30/06/2022",
        listaModulos
    }
    res.json(datos);
}


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
        const {usuario, fechahora} = req.body;
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
                buscarPedido.fechahora = fechahora;
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