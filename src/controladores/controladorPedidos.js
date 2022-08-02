const { validationResult } = require('express-validator');
const modeloPedidos = require('../modelos/modeloPedidos');
const modeloMeseros = require('../modelos/modeloMeseros');
const modeloEstaciones = require('../modelos/modeloEstaciones');


const MSJ = require('../componentes/mensajes')
const validar = require('../componentes/validar')
exports.Inicio = async (req, res) => {
    const listaModulos = [
        {
            modulo:"Pedidos",
            ruta:"/api/pedidos",
            metodo:"GET",
            parametros:"",
            descripcion:"Inicio del módulo Pedidos"
        },
        {
            modulo:"Pedidos",
            ruta:"/api/pedidos/pedidos/listar",
            metodo:"GET",
            parametros:"",
            descripcion:"Lista todos los Pedidos"
        },
        {
            modulo:"Pedidos",
            ruta:"/api/pedidos/pedidos/guardar",
            metodo:"POST",
            parametros:"idmesero,Estacion,activo,modalidad('ME','DO','LL'),estado('AAA','NNN','SNN','SSN','SNS','SSS','NSS','NSN')",
            descripcion:"Guarda un detalle pedido"
        },
        {
            modulo:"Pedidos",
            ruta:"/api/pedidos/pedidos/editar",
            metodo:"PUT",
            query:"id",
            parametros:"idmesero,fechahora,Estacion,activo,modalidad('ME','DO','LL'),estado('AAA','NNN','SNN','SSN','SNS','SSS','NSS','NSN')",
            descripcion:"Actualiza un DetallePedido"
        },
        {
            modulo:"Pedidos",
            ruta:"/api/pedidos/pedidos/eliminar",
            metodo:"DELETE",
            query:"id",
            descripcion:"Elimina un DetallePedido"
        }
    ]
    const datos = {
        api:"API-SIGRES",
        segmento:"Pedidos",
        descripcion:"CRUD para Pedidos",
        propiedad:"Sistemas SIGRES",
        desarrollador:"Elvis Rolando Rodesno Alfaro",
        colaboradores:"",
        fecha:"3/07/2022",
        listaModulos
    }
    res.json(datos);
}

//Funcion para obtener todos los pedidos de la tabla
exports.Listar = async (req, res) => { //async es para que espere a que se ejecute la funcion y le devuelta un resultado
    const msj = validar(req);
    try {
        const lista = await modeloPedidos.findAll({
            order: [
                ['NumeroPedido', 'ASC']
            ],
            include: [{
                model: modeloMeseros,
            },{
                model: modeloEstaciones,
            }
            ]
        });
        //console.log(lista);
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
    }
};

//export listarmeseros
exports.ListarMeseros = async (req, res) => {
    const msj = validar(req);
    try {
        const lista = await modeloMeseros.findAll();
        //console.log(lista);
        res.json(lista);
    }
    catch(error){
        //console.error(error);
        res.json(error);
    }
}

exports.ListarEstaciones = async (req, res) => {
    const msj = validar(req);
    try {
        const lista = await modeloEstaciones.findAll();
        //console.log(lista);
        res.json(lista);
    }
    catch(error){
        //console.error(error);
        res.json(error);
    }
}

/* #Funcion para guardar un nuevo pedido que recibe mediante el body
#La fechas y el numero de pedido se genera automaticamente */
exports.Guardar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: '',
        errores: []
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            //msj.errores += element.msg + '. ';
            msj.errores.push(element.msg);
        });
    }
    else{
        const { idmesero, estacion, Estacion, activo, modalidad, estado } = req.body;
        try {
            await modeloPedidos.create({
                idmesero: idmesero,
                estacion: estacion,
                Estacion: Estacion,
                activo: activo,
                modalidad: modalidad,
                estado: estado
            });
            msj.mensaje='Pedido almacenado correctamente';
            msj.errores='';
        } 
        catch (error) {
            msj.mensaje='Error al guardar el pedido';
            msj.errores=error;
        }
            
    }
    res.json(msj);    
};
   
/* #Funcion para editar un pedido existente segun el NumeroPedido que se envia en el Parametro id de la url
#Valida que exista el id del pedido para poder editarlo
#La fecha se actualiza automaticamente */
exports.Editar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: '',
        errores: []
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            msj.errores.push(element.msg);
        });
    }
    else{
        const { id } = req.query;
        const { idmesero, fechahora, estacion, Estacion, activo, modalidad, estado } = req.body;
        try {
            var buscarPedido = await modeloPedidos.findOne({
                where: {
                    NumeroPedido: id
                }
            });
            if(!buscarPedido){
                msj.mensaje='El Numero del pedido no existe';
            }
            else{
                buscarPedido.idmesero = idmesero;
                buscarPedido.Estacion = Estacion;
                buscarPedido.activo = activo;
                buscarPedido.modalidad = modalidad;
                buscarPedido.estado = estado;
                await buscarPedido.save();
                msj.mensaje='Pedido editado correctamente';
                msj.errores='';
            }            
        } 
        catch (error) {
            msj.mensaje='Error al editar el pedido';
            msj.errores=error;
        }
            
    }
    res.json(msj);
};

/* 
#Funcion que elimina un pedido segun el NumeroPedido que se envia en el Parametro id de la url
#Valida que exista el id del pedido  para eliminarlo */
exports.Eliminar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: '',
        errores: []
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
           // msj.mensaje += element.msg + '. ';
           msj.errores.push(element.msg);
        });
    }
    else{
        const { id } = req.query;
        try {
            var buscarPedido = await modeloPedidos.findOne({
                where: {
                    NumeroPedido: id
                }
            });
            if(!buscarPedido){
                msj.mensaje='El Numero del pedido no existe';
            }
            else{
                await buscarPedido.destroy({
                    where: {
                        NumeroPedido: id
                    }
                });
                msj.mensaje='Pedido eliminado correctamente';
                msj.errores='';
            }            
        } 
        catch (error) {
            msj.mensaje='Error al eliminar el pedido';
            msj.errores=error;
        }
            
    }
    res.json(msj);
};