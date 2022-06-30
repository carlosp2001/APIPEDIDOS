/*-----------By: Idaly Manzanares 0209200201095-----------*/ 

const {validationResult} = require('express-validator');
const modeloPedidosMesa = require('../modelos/modelosPedidosMesa');

exports.inicio = async (req, res) =>{
    var msj = validacion(req);
    const modeloPedidosMesa = [
        {
        modulo : "Pedidos Mesa",
        ruta: "/api/pedidosmesa",
        metodo: "get",
        parametros: "",
        descripcion: "Inicio del modulo de Pedidos Mesa"
        },
        {
        modulo: "Pedidos Mesa",
        ruta: "/api/pedidosmesa/listar",
        metodo: "get",
        parametros: "",
        descripcion: "Lista todos los pedidos"
        },
];
const datos = {
    api: "Proyecto Grupo2",
    descripcion: "Interfaz de programacion para el sistema de pedidos",
    propiedad: "Grupo2",
    desarrollador: "Idaly Manzanares",
    Colaboradores: "",
    fecha: "29/06/2022",
};
msj.datos = datos;
};

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
