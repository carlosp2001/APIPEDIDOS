const MSJ = require('../componentes/mensajes')
const validar = require('../componentes/validar')

const modeloPedidosyVentas = require('../modelos/modeloPedidosyVentas.js');

exports.Inicio = async (req, res) => {
    const listaModulos = [
        {
            modulo:"PedidosyVentas",
            ruta:"/api/pedidosyVentas",
            metodo:"GET",
            parametros:"",
            descripcion:"Inicio del módulo PedidosyVentas"
        },
        {
            modulo:"PedidosyVentas",
            ruta:"/api/pedidosyVentas/listar",
            metodo:"GET",
            parametros:"",
            descripcion:"Lista todos los PedidosyVentas"
        },
        {
            modulo:"PedidosyVentas",
            ruta:"/api/pedidosyVentas/guardar",
            metodo:"POST",
            parametros:"NumeroPedido,NumeroFactura",
            descripcion:"Guarda un Pedido de una Venta"
        },
        {
            modulo:"PedidosyVentas",
            ruta:"/api/pedidosyVentas/guardarbulk",
            metodo:"POST",
            parametros:"NumeroPedido,NumeroFactura",
            estructura:'[{NumeroPedido,NumeroFactura},{NumeroPedido,NumeroFactura}]',
            descripcion:"Guarda PedidosyVentas en bulk/lotes/granel"
        },
        {
            modulo:"PedidosyVentas",
            ruta:"/api/pedidosyVentas/editar",
            metodo:"PUT",
            query:"id",
            parametros:"NumeroPedido,NumeroFactura",
            descripcion:"Actualiza un PedidosyVentas"
        },
        {
            modulo:"PedidosyVentas",
            ruta:"/api/pedidosyVentas/editar",
            metodo:"DELETE",
            query:"id",
            descripcion:"Elimina un PedidosyVentas"
        }
    ]
    const datos = {
        api:"API-SIGRES",
        segmento:"PedidosyVentas",
        descripcion:"CRUD para PedidosyVentas",
        propiedad:"Sistemas SIGRES",
        desarrollador:"",
        colaboradores:"",
        fecha:"30/06/2022",
        listaModulos
    }
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(datos, null, 4));

    //res.json(datos);
}

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloPedidosyVentas.findAll();
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
        const { NumeroFactura, NumeroPedido } = req.body;
        try {
            await modeloPedidosyVentas.create(
                {
                    NumeroFactura: NumeroFactura,
                    NumeroPedido: NumeroPedido
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

exports.GuardarBulk = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else {
        const pedidosyVentas = req.body;
        try {
            await modeloPedidosyVentas.bulkCreate(
                pedidosyVentas
            )
            msj.estado = 'correcto';
            msj.mensaje = 'Se ha guardado los registros correctamente';
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
        // const NumeroFactura = req.query.id;
        const { NumeroFactura, NumeroPedido } = req.body;
        try {
            var buscarPedidosLlevar = await modeloPedidosyVentas.findOne({
                where: {
                    NumeroFactura: NumeroFactura
                }
            });
            if (!buscarPedidosLlevar) {
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                MSJ(res,500,msj); 
            } else {
                buscarPedidosLlevar.NumeroFactura = NumeroFactura;
                buscarPedidosLlevar.NumeroPedido = NumeroPedido;
                await buscarPedidosLlevar.save();
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


exports.Eliminar = async (req, res) =>{
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else {
        var eliminarPedidosyVentas = await modeloPedidosyVentas.findOne({
            where: {
                NumeroFactura: NumeroFactura
            }
        });
        if (eliminarPedidosyVentas) {
            await eliminarPedidosyVentas.destroy();
            msj.estado = 'correcto';
            msj.mensaje = 'Se ha eliminado el registro correctamente';
            msj.errores = '';
            MSJ(res,200,msj);   
        } else {
            msj.estado = 'error';
            msj.mensaje = 'No se ha encontrado el registro';
            msj.errores = '';
            MSJ(res,500,msj);
        }
    }    
}
