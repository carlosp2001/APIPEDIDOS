const {validationResult} = require('express-validator');
const modeloPedidosyVentas = require('../modelos/modeloPedidosyVentas.js');

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
        // const NumeroFactura = req.query.id;
        const { NumeroFactura, NumeroPedido } = req.body;
        try {
            var buscarPedidosLlevar = await modeloPedidosyVentas.findOne({
                where: {
                    NumeroFactura: NumeroFactura
                }
            });
            if (!buscarPedidosLlevar) {
                msj.mensaje = 'El id de registro no existe';
            } else {
                buscarPedidosLlevar.NumeroFactura = NumeroFactura;
                buscarPedidosLlevar.NumeroPedido = NumeroPedido;
                await buscarPedidosLlevar.save();
                msj.mensaje = 'Registro Almacenado';
            }
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
            
        }
    }
    res.json(msj);
}


exports.Eliminar = async (req, res) =>{
    const NumeroFactura = req.query.id;
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj  = {
        mensaje: "Ninguno"
    };
    if (!NumeroFactura){
        msj.mensaje = 'Debe enviar los datos completos';
    }
    else {
        var eliminarPedidosyVentas = await modeloPedidosyVentas.destroy({
            where: {
                NumeroFactura: NumeroFactura
            }
        });
        if (eliminarPedidosyVentas) {
            msj.mensaje = 'Peticion Procesada correctamente';    
        } else {
            msj.mensaje = 'No se pudo realizar la operacion'; 
        }
    }    
    res.json(msj);
    }
