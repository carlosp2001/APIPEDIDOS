const modeloEntregaPedido = require('../modelos/modeloEntregaPedido');

const MSJ = require('../componentes/mensajes')
const validar = require('../componentes/validar')

exports.Inicio = async (req, res)=>{
    const listamodulos = [
        {  segmento: "Entrega Pedido",
            ruta: "/api/pedidos/entregapedido", 
            metodo: "GET",
            parametros: "",
            descripcion: "Inicio del modulo pedidos elaborados"},
        {
            segmento: "Entrega Pedido",
            ruta: "/api/pedidos/entregapedido/listar",
            metodo: "GET",
            descripcion: "Lista los pedidos elaborados"
        },
        {   segmento: "Entrega Pedido",
            ruta: "/api/pedidos/entregapedido/guardar",
            metodo: "POST",
            parametros: "iddetalle_pedido, usuario,fechahora,identrega",
            descripcion: "Guarda un Entrega Pedido"
        },
        {
            segmento:"Pedidos Elaborados",
            ruta:"/api/pedidos/entregapedido/guardarbulk",
            metodo:"POST",
            parametros: "iddetalle_pedido, usuario,fechahora,identrega",
            estructura:'[{iddetalle_pedido,usuario,fechahora,identrega},{iddetalle_pedido,usuario,fechahora,identrega}]',
            descripcion:"Guarda Entrega Pedido en bulk/lotes/granel"
        },
        {
            segmento: "Entrega Pedido",
            ruta: "/api/pedidos/entregapedido/editar",
            metodo: "PUT",
            query: "id",
            parametros: "iddetalle_pedido, usuario, fechahora, identrega",
            descripcion: "Edita los Entrega Pedido"
        },
        {
            segmento: "Entrega Pedido",
            ruta: "/api/pedidos/entregapedido/eliminar",
            metodo: "DELETE",
            query: "id",
            descripcion: "Elimina el Entrega Pedido"
        },
    ];

    const datos = {
        api: "API-SIGRES",
        segmento: "Entrega Pedido",
        descripcion: "CRUD DE Entrega Pedido",
        propiedad: "SIGRES",
        desarrollador: "Javier Raul Tabora Castejon",
        colaboradores: "",
        fecha: "05/07/2022",
        listamodulos
    };
    res.json(datos);
}

exports.Listar = async (req, res) => {
    const msj = validar(req);
    try {
        const lista = await modeloEntregaPedido.findAll();
        console.log(lista);
        res.json(lista);
    } catch (error) {
        msj.estado = 'error';
        msj.mensaje = 'La Peticion no se ejecuto';
        msj.errores = error;
        MSJ(res,500,error)
    }
}

exports.Guardar = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        const {iddetalle_pedido, usuario,fechahora,identrega} = req.body;
        try {            
            await modeloEntregaPedido.create({
                iddetalle_pedido,
                usuario,
                fechahora,
                identrega
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
        const entregaPedido = req.body;
        try {
            await modeloEntregaPedido.bulkCreate(
                entregaPedido
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
        const {usuario,fechahora,identrega} = req.body;
        try { 
            var buscarEntregaPedido = await modeloEntregaPedido.findOne({
                where: {
                    iddetalle_pedido: id 
                }
            });       
            if(!buscarEntregaPedido){
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado un registro con el ID ' + id;
                msj.errores = '';
                MSJ(res,500,msj);
            }else{
                buscarEntregaPedido.usuario = usuario;
                buscarEntregaPedido.fechahora = fechahora;
                buscarEntregaPedido.identrega = identrega;
                await buscarEntregaPedido.save();

                msj.estado = 'correcto';
                msj.mensaje = 'Detalle pedido actualizado correctamente';
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
        const {id} = req.query;
        try { 
            var buscarEntregaPedido = await modeloEntregaPedido.findOne({
                where: {
                    iddetalle_pedido: id
                }
            });       
            if(!buscarEntregaPedido){
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                MSJ(res,500,msj);
            }
            else{
                await buscarEntregaPedido.destroy({
                    where: {
                        iddetalle_pedido: id
                    }
                });
                msj.estado = 'correcto';
                msj.mensaje = 'Se ha eliminado el registro correctamente';
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



