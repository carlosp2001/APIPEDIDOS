
const modeloDetallePedidos = require('../modelos/modeloDetallePedidos');

const MSJ = require('../componentes/mensajes')
const validar = require('../componentes/validar')

exports.Inicio = async (req, res) => {
    const listaModulos = [
        {
            modulo:"DetallePedidos",
            ruta:"/api/pedidos/detallepedidos",
            metodo:"GET",
            parametros:"",
            descripcion:"Inicio del módulo DetallePedidos"
        },
        {
            modulo:"DetallePedidos",
            ruta:"/api/pedidos/detallepedidos/listar",
            metodo:"GET",
            parametros:"",
            descripcion:"Lista todos los DetallePedidos"
        },
        {
            modulo:"DetallePedidos",
            ruta:"/api/pedidos/detallepedidos/guardar",
            metodo:"POST",
            parametros:"NumeroPedido,CodigoProducto,Cantidad,Notas,subproducto,Cancelado,Elaborado,Entregado,Facturado",
            descripcion:"Guarda un detalle pedido"
        },
        {
            modulo:"DetallePedidos",
            ruta:"/api/pedidos/detallepedidos/guardarbulk",
            metodo:"POST",
            parametros:"NumeroPedido,CodigoProducto,Cantidad,Notas,subproducto,Cancelado,Elaborado,Entregado,Facturado",
            estructura:'[{NumeroPedido,CodigoProducto,Cantidad,Notas,subproducto,Cancelado,Elaborado,Entregado,Facturado},{NumeroPedido,CodigoProducto,Cantidad,Notas,subproducto,Cancelado,Elaborado,Entregado,Facturado}]',
            descripcion:"Guarda DetallesPedido en bulk/lotes/granel"
        },
        {
            modulo:"DetallePedidos",
            ruta:"/api/pedidos/detallepedidos/editar",
            metodo:"PUT",
            query:"id",
            parametros:"NumeroPedido,CodigoProducto,Cantidad,Notas,subproducto,Cancelado,Elaborado,Entregado,Facturado",
            descripcion:"Actualiza un DetallePedido"
        },
        {
            modulo:"DetallePedidos",
            ruta:"/api/pedidos/detallepedidos/editar",
            metodo:"DELETE",
            query:"id",
            descripcion:"Elimina un DetallePedido"
        }
    ]
    const datos = {
        api:"API-SIGRES",
        segmento:"DetallePedidos",
        descripcion:"CRUD para DetallePedidos",
        propiedad:"Sistemas SIGRES",
        desarrollador:"Javier Raul Tabora Castejon",
        colaboradores:"",
        fecha:"30/06/2022",
        listaModulos
    }
    res.json(datos);
}

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloDetallePedidos.findAll();
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
        MSJ(res,500,msj);
    }else{
        const {NumeroPedido, CodigoProducto, Cantidad, Notas, subproducto, Cancelado,Elaborado,Entregado,Facturado} = req.body;
        try {
            await modeloDetallePedidos.create({
                NumeroPedido,
                CodigoProducto,
                Cantidad,
                Notas,
                subproducto,
                Cancelado,
                Elaborado,
                Entregado,
                Facturado
                
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
        const DetallePedido = req.body;
        try {
            await modeloDetallePedidos.bulkCreate(
                DetallePedido
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
        const {idregistro} = req.query;
        const {NumeroPedido, CodigoProducto, Cantidad, Notas, subproducto, Cancelado,Elaborado,Entregado,Facturado} = req.body;
        
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro
                }
            })
            if(buscarDetallePedido){
                buscarDetallePedido.NumeroPedido = NumeroPedido;
                buscarDetallePedido.CodigoProducto = CodigoProducto;
                buscarDetallePedido.Cantidad = Cantidad;
                buscarDetallePedido.Notas = Notas;
                buscarDetallePedido.subproducto = subproducto;
                buscarDetallePedido.Cancelado = Cancelado;
                buscarDetallePedido.Elaborado = Elaborado;
                buscarDetallePedido.Entregado = Entregado;
                buscarDetallePedido.Facturado = Facturado;
                await buscarDetallePedido.save();

                msj.estado = 'correcto';
                msj.mensaje = 'Se ha guardado el registro correctamente';
                msj.errores = '';
                MSJ(res,200,msj);
            }else{
                msj.estado = 'error';
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

exports.Eliminar = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        const {idregistro} = req.query;
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro
                }
            })
            if(buscarDetallePedido){
                await buscarDetallePedido.destroy();
                msj.estado = 'correcto';
                msj.mensaje = 'Se ha eliminado el registro correctamente';
                msj.errores = '';
                MSJ(res,200,msj);
            }else{
                msj.estado = 'error';
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

exports.EstadoCancelado = async (estado, id) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        const {idregistro} = id;
        const {Cancelado} = estado;
        
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro
                }
            })
            if(buscarDetallePedido){
                buscarDetallePedido.Cancelado = Cancelado;
                await buscarDetallePedido.save();

                msj.estado = 'correcto';
                msj.mensaje = 'Se ha guardado el registro correctamente';
                msj.errores = '';
                return(msj)
            }else{
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                return(msj)
            }
            
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La Peticion no se ejecuto';
            msj.errores = error;
            return(msj)
        }
    }
}

exports.EstadoElaborado = async (estado, id) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        const {idregistro} = id;
        const {Elaborado} = estado;
        
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro
                }
            })
            if(buscarDetallePedido){
                buscarDetallePedido.Elaborado = Elaborado;
                await buscarDetallePedido.save();

                msj.estado = 'correcto';
                msj.mensaje = 'Se ha guardado el registro correctamente';
                msj.errores = '';                
                return(msj)
            }else{
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';                
                return(msj)
            }
            
        } catch (error) {
            return(msj)
        }
    }
}

exports.EstadoEntregado = async (estado, id) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        return(msj);
    }else{
        const {idregistro} = id;
        const {Entregado} = estado;
        
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro
                }
            })
            if(buscarDetallePedido){
                buscarDetallePedido.Entregado = Entregado;
                await buscarDetallePedido.save();

                msj.estado = 'correcto';
                msj.mensaje = 'Se ha guardado el registro correctamente';
                msj.errores = '';
                return(msj)
            }else{
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                return(msj)
            }
            
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La Peticion no se ejecuto';
            msj.errores = error;
            return(msj)
        }
    }
}

exports.EstadoFacturado = async (estado, id) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        const {idregistro} = id;
        const {Facturado} = estado;
        
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro
                }
            })
            if(buscarDetallePedido){
                buscarDetallePedido.Facturado = Facturado;
                await buscarDetallePedido.save();

                msj.estado = 'correcto';
                msj.mensaje = 'Se ha guardado el registro correctamente';
                msj.errores = '';
                return(msj)
            }else{
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                return(msj)
            }
            
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La Peticion no se ejecuto';
            msj.errores = error;
            return(msj)
        }
    }
}