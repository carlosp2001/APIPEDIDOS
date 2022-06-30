/*-----------By: Idaly Manzanares 0209200201095-----------*/ 

const {validationResult} = require('express-validator');
const modeloPedidosMesa = require('../modelos/modelosPedidosMesa');

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
            parametros:"idregistro,idpedido,idpedidomesa,cuenta,nombrecuenta",
            descripcion:"Guarda un detalle PedidoMesa"
        },
        {
            modulo:"PedidosMesa",
            ruta:"/api/pedidos/pedidosmesa/guardarbulk",
            metodo:"POST",
            parametros:"idregistro,idpedido,idpedidomesa,cuenta,nombrecuenta",
            estructura:'[{idregistro,idpedido,idpedidomesa,cuenta,nombrecuenta},{idregistro,idpedido,idpedidomesa,cuenta,nombrecuenta}]',
            descripcion:"Guarda PedidoMesa en bulk/lotes/granel"
        },
        {
            modulo:"PedidosMesa",
            ruta:"/api/pedidos/pedidosmesa/editar",
            metodo:"PUT",
            query:"id",
            parametros:"idregistro,idpedido,idpedidomesa,cuenta,nombrecuenta",
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
        const { idpedido, idregistro } = req.body;
        try {
            await modeloPedidosLlevar.create(
                {
                    idpedido: idpedido,
                    idregistro: idregistro
                }
            );
            msj.mensaje = 'Registro almacenado'
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
       
    }

    res.json(msj);
    
   
};

exports.Editar = async (req, res) =>{
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ' '
    };
    if (validaciones.errors.length > 0) {
        // validaciones.errors.aÍÍrray.forEach(element => {
        //     msj.mensaje += element.msg + '. ';
        // });
    }
    else {
        const idregistro = req.query.id;
        const { idpedido, cuenta, nombrecuenta } = req.body;
        try {
            var buscarPedidosMesa = await modeloPedidosMesa.findOne({
                where: {
                    idregistro: idregistro
                }
            });
            if (!buscarPedidosMesa) {
                msj.mensaje = 'El id de registro no existe';
            } else {
                buscarPedidosMesa.idpedido = idpedido;
                buscarPedidosMesa.cuenta = cuenta;
                buscarPedidosMesa.nombrecuenta = nombrecuenta;
                await buscarPedidosMesa.save();
                msj.mensaje = 'Registro Almacenado';
            }
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
    }
    res.json(msj);
}


exports.Eliminar = async (req, res) =>{
    const idregistro = req.query.id;
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj  = {
        mensaje: "Ninguno"
    };
    if (!idregistro){
        msj.mensaje = 'Debe enviar los datos completos';
    }
    else {
        var eliminarpedidosMesa = await modeloPedidosMesa.destroy({
            where: {
                idregistro: idregistro
            }
        });
        if (eliminarpedidosMesa) {
            msj.mensaje = 'Peticion Procesada correctamente';    
        } else {
            msj.mensaje = 'No se pudo realizar la operacion'; 
        }
    }    
    res.json(msj);
    }
