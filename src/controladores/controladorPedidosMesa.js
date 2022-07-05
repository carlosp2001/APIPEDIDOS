/*-----------By: Idaly Manzanares 0209200201095-----------*/ 

const modeloPedidosMesa = require('../modelos/modelosPedidosMesa');

const MSJ = require('../componentes/mensajes')
const validar = require('../componentes/validar')

exports.Inicio = async (req, res) => {
    const listaModulos = [
        {
            modulo:"PedidosMesa",
            ruta:"/api/pedidos/pedidosmesa",
            metodo:"GET",
            parametros:"",
            descripcion:"Inicio del módulo PedidosMesa"
        },
        {
            modulo:"PedidosMesa",
            ruta:"/api/pedidos/pedidosmesa/listar",
            metodo:"GET",
            parametros:"",
            descripcion:"Lista todos los PedidosMesa"
        },
        {
            modulo:"PedidosMesa",
            ruta:"/api/pedidos/pedidosmesa/guardar",
            metodo:"POST",
            parametros:"id,idpedido,idpedidomesa,cuenta,nombrecuenta",
            descripcion:"Guarda un detalle PedidoMesa"
        },
        {
            modulo:"PedidosMesa",
            ruta:"/api/pedidos/pedidosmesa/editar",
            metodo:"PUT",
            query:"id",
            parametros:"id,idpedido,idpedidomesa,cuenta,nombrecuenta",
            descripcion:"Actualiza un PedidoMesa"
        },
        {
            modulo:"PedidosMesa",
            ruta:"/api/pedidos/pedidosmesa/editar",
            metodo:"DELETE",
            query:"id",
            descripcion:"Elimina un PedidoMesa"
        }
    ]
    const datos = {
        api:"API-SIGRES",
        segmento:"DetallePedidos",
        descripcion:"CRUD para DetallePedidos",
        propiedad:"Sistemas SIGRES",
        desarrollador:"Idaly Fernanda Manzanares Castro",
        colaboradores:"",
        fecha:"30/06/2022",
        listaModulos
    }
    res.json(datos);
}

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloPedidosMesa.findAll();
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
        const { idpedido, idpedidomesa, cuenta, nombrecuenta } = req.body;
        try {
            await modeloPedidosMesa.create(
                {
                    idpedido: idpedido,
                    idmesa: idpedidomesa,
                    cuenta: cuenta,
                    nombrecuenta: nombrecuenta
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
        const id = req.query.id;
        const { idpedido, cuenta, nombrecuenta, idpedidomesa, } = req.body;
        try {
            var buscarPedidosMesa = await modeloPedidosMesa.findOne({
                where: {
                    idregistro: id
                }
            });
            if (!buscarPedidosMesa) {
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                MSJ(res,500,msj);
            } else {
                buscarPedidosMesa.idpedido = idpedido;
                buscarPedidosMesa.cuenta = cuenta;
                buscarPedidosMesa.idmesa = idpedidomesa;
                buscarPedidosMesa.nombrecuenta = nombrecuenta;
                await buscarPedidosMesa.save();
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
            const { idregistro } = req.query;
            var eliminarpedidosMesa = await modeloPedidosMesa.findOne({
                where: {
                    idregistro: idregistro
                }
            });
            if (eliminarpedidosMesa) {
                await eliminarpedidosMesa.destroy();
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
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La Peticion no se ejecuto';
            msj.errores = error;
            MSJ(res,500,error)
        }
    }    
}
