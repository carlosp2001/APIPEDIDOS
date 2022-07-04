const {validationResult} = require('express-validator');
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
        console.log(lista);
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
};

exports.Guardar = async (req, res) => {
    // console.log(req.body);
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ' '
    };  
    if (validaciones.errors.length > 0) {
        validaciones.errors.array.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });
    }
    else {
        const { NumeroFactura, NumeroPedido } = req.body;
        try {
            await modeloPedidosyVentas.create(
                {
                    NumeroFactura: NumeroFactura,
                    NumeroPedido: NumeroPedido
                }
            );
            msj.mensaje = 'Registro almacenado'
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
       
    }

    res.json(msj);
    
   
};

exports.GuardarBulk = async (req, res) => {
    // console.log(req.body);
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: []
    };  
    if (validaciones.errors.length > 0) {
        msj.mensaje = validaciones.errors;
    }
    else {
        const pedidosyVentas = req.body;
        try {
            await modeloPedidosyVentas.bulkCreate(
                pedidosyVentas
            )
            msj.mensaje = 'Registro almacenado'
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
    
    }

    res.json(msj);
    
};
