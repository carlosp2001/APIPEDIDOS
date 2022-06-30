
const modeloDetallePedidos = require('../modelos/modeloDetallePedidos');

const MSJ = require('../componentes/mensajes')
const validar = require('../componentes/validar')

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloDetallePedidos.findAll();
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
}

exports.Guardar = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        const {NumeroPedidos, CodigoProducto, Cantidad, Notas, subproducto, Cancelado,Elaborado,Entregado,Facturado} = req.body;
        try {
            await modeloDetallePedidos.create({
                NumeroPedidos,
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
        const {NumeroPedidos, CodigoProducto, Cantidad, Notas, subproducto, Cancelado,Elaborado,Entregado,Facturado} = req.body;
        
        try {
            var buscarDetallePedido = await modeloDetallePedidos.findOne({
                where: {
                    idregistro
                }
            })
            if(buscarDetallePedido){
                buscarDetallePedido.NumeroPedidos = NumeroPedidos;
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
                msj.estado = 'ERROR';
                msj.mensaje = 'No se ha encontrado el registro';
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