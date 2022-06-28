const {validationResult} = require('express-validator');
const modeloPedidosLlevar = require('../modelos/modeloPedidosLlevar');

exports.Listar = async (req, res) => {
    try {
        const lista = await modeloPedidosLlevar.findAll();
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
        const { idpedido, idcliente } = req.body;
        try {
            await modeloPedidosLlevar.create(
                {
                    idpedido: idpedido,
                    idcliente: idcliente
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
        const { idpedido, idcliente } = req.body;
        try {
            var buscarPedidosLlevar = await modeloPedidosLlevar.findOne({
                where: {
                    idregistro: idregistro
                }
            });
            if (!buscarPedidosLlevar) {
                msj.mensaje = 'El id de registro no existe';
            } else {
                buscarPedidosLlevar.idpedido = idpedido;
                buscarPedidosLlevar.idcliente = idcliente;
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
        var eliminarpedidosllevar = await modeloPedidosLlevar.destroy({
            where: {
                idregistro: idregistro
            }
        });
        if (eliminarpedidosllevar) {
            msj.mensaje = 'Peticion Procesada correctamente';    
        } else {
            msj.mensaje = 'No se pudo realizar la operacion'; 
        }
    }    
    res.json(msj);
    }