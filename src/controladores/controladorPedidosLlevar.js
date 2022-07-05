const { DATE } = require('sequelize');
const modeloPedidosLlevar = require('../modelos/modeloPedidosLlevar');

const MSJ = require('../componentes/mensajes')
const validar = require('../componentes/validar')

exports.Inicio = async (req, res) => {
    const listaModulos = [
        {
            modulo: "Pedidos Llevar",
            ruta: "api/pedidos/pedidosLlevar",
            metodo: "get",
            parametros: "",
            descripcion: "Inicio el Modulo"
        },
        {
            modulo: "Pedidos Llevar",
            ruta: "api/pedidos/pedidosLlevar/listar",
            metodo: "get",
            parametros: "",
            descripcion: "Solicitud para listar registros en pedidosLlevar"
        },
        {
            modulo: "Pedidos Llevar",
            ruta: "api/pedidos/pedidosLlevar/guardar",
            metodo: "post",
            parametros: "idpedido, idcliente",
            descripcion: "Solicitud para guardar registros en pedidosLlevar"
        },
        {
            modulo: "Pedidos Llevar",
            ruta: "api/pedidos/pedidosLlevar/editar",
            metodo: "put",
            query: "id",
            parametros: "idpedido, idcliente",
            descripcion: "Solicitud para editar registros en pedidosLlevar"
        },
        {
            modulo: "Pedidos Llevar",
            ruta: "api/pedidos/pedidosLlevar/eliminar",
            metodo: "del",
            query: "id",
            descripcion: "Solicitud para eliminar registro en pedidosLlevar"
        },
    ]
    const datos = {
        api: "API PEDIDOS",
        descripcion: "Interfaz de programacion",
        propiedad: "DESOFIW",
        desarrollador: "Carlos Alberto Pineda",
        colaboradores: "",
        fecha: "",
        listaModulos
    }
    
    res.json(datos);
}


exports.Listar = async (req, res) => {
    try {
        const lista = await modeloPedidosLlevar.findAll();
        console.log(lista);
        res.json(lista);
    } catch (error) {
        msj.estado = 'error';
        msj.mensaje = 'La Peticion no se ejecuto';
        msj.errores = error;
        MSJ(res,500,error)
    }
};

exports.Guardar = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else {
        const { idpedido, idcliente } = req.body;
        try {
            await modeloPedidosLlevar.create(
                {
                    idpedido: idpedido,
                    idcliente: idcliente
                }
            );
            msj.estado = 'correcto';
            msj.mensaje = 'Se ha guardado el registro correctamente';
            msj.errores = '';
            MSJ(res,200,msj);
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La Peticion no se ejecuto';
            msj.errores = error;
            MSJ(res,500,error)
        }
    }
};

exports.Editar = async (req, res) =>{
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else {
        const idregistro = req.query.id;
        const { idpedido, idcliente } = req.body;
        try {
            var buscarPedidosLlevar = await modeloPedidosLlevar.findOne({
                where: {
                    idregistro: idregistro
                }
            });
            if (!buscarPedidosLlevar) {
                msj.estado = 'ERROR';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                MSJ(res,200,msj);
            } else {
                buscarPedidosLlevar.idpedido = idpedido;
                buscarPedidosLlevar.idcliente = idcliente;
                await buscarPedidosLlevar.save();
                msj.estado = 'correcto';
                msj.mensaje = 'Se ha guardado el registro correctamente';
                msj.errores = '';
                MSJ(res,200,msj);
            }
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La Peticion no se ejecuto';
            msj.errores = error;
            MSJ(res,500,error)
        }
    }
}


exports.Eliminar = async (req, res) =>{
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else {
        try {
            var eliminarpedidosllevar = await modeloPedidosLlevar.findOne({
                where: {
                    idregistro: id
                }
            });
            if (eliminarpedidosllevar) {
                await eliminarpedidosllevar.destroy();
                msj.estado = 'correcto';
                msj.mensaje = 'Se ha eliminado el registro correctamente';
                msj.errores = '';
                MSJ(res,200,msj);    
            } else {
                msj.estado = 'ERROR';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                MSJ(res,500,msj); 
            }
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La Peticion no se ejecuto';
            msj.errores = error;
            MSJ(res,500,error)
        }
    }   
}