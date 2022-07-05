//modulo trabajado por francis lara.
const modeloPedidosCancelados = require('../modelos/modeloPedidosCancelados');

const MSJ = require('../componentes/mensajes')
const validar = require('../componentes/validar')

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
            ruta:"/api/pedidos/pedidosCancelados/guardarbulk",
            metodo:"POST",
            parametros:"numeropedido,usuario",
            estructura:'[{numeropedido,usuario},{numeropedido,usuario}]',
            descripcion:"Guarda Pedidos Cancelados en bulk/lotes/granel"
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


exports.Listar = async (req, res) => {
    const msj = validar(req);
    try {
        const lista = await modeloPedidosCancelados.findAll();
        res.json(lista);
    } catch (error) {
        msj.estado = 'error';
        msj.mensaje = 'La Peticion no se ejecuto';
        msj.errores = error;
        MSJ(res,500,error)
    }
}

exports.Guardar = async (req, res)=>{
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        const {numeropedido, usuario} = req.body;
        try {
            await modeloPedidosCancelados.create({
                numeropedido: numeropedido, //izquierda, como esta en la tabla
                usuario: usuario
            });
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
}

exports.GuardarBulk = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else {
        const PedidosCancelados = req.body;
        try {
            await modeloPedidosCancelados.bulkCreate(
                PedidosCancelados
            )
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

exports.Editar = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
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
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                MSJ(res,500,msj);
            }
            else{
                buscarPedido.usuario = usuario;
                buscarPedido.fechahora = fechahora;
                await buscarPedido.save();

                msj.estado = 'correcto';
                msj.mensaje = 'Se ha modificado el registro correctamente';
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

exports.Eliminar = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        const {id} = req.query; //la id es la que se envia en el query
        try { 
            var buscarPedido = await modeloPedidosCancelados.findOne({
                where: {
                    numeropedido: id
                }
            });       
            if(!buscarPedido){
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                MSJ(res,500,msj);
            }
            else{
                await buscarPedido.destroy({
                    where: {
                        numeropedido : id
                    }
                });                
                msj.estado = 'correcto';
                msj.mensaje = 'Pedido cancelado eliminado correctamente';
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