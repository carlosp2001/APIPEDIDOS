const modeloPedidosElaborados = require('../modelos/modeloPedidosElaborados');

const MSJ = require('../componentes/mensajes')
const validar = require('../componentes/validar')

//en el controlador se crean las funciones (CRUD)

exports.Listar = async(req, res) => {
    try {
        const lista = await modeloPedidosElaborados.findAll();//con el findall le indicamos que busque todos los datos
        console.log(lista);
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
        MSJ(res,200,msj);
    }else{
        const {iddetallepedido, idusuario} = req.body;
        try {            
            await modeloPedidosElaborados.create({
                iddetallepedido: iddetallepedido, //izquierda=identico a la tabla //derecha=es la variable que le declaramos en la linea 30
                idusuario: idusuario //izquierda=identico a la tabla //derecha=es la variable que le declaramos en la linea 30
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
        const PedidoElaborado = req.body;
        try {
            await modeloPedidosElaborados.bulkCreate(
                PedidoElaborado
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
        const {id} = req.query; //es la variable que declaramos en el thunder
        const {idusuario} = req.body;
        try { 
            var buscardetalle = await modeloPedidosElaborados.findOne({//con el findone le indicamos que busque solo un dato
                where: {
                    iddetallepedido: id //le indicamos que busque el dato por medio del que indicamos en el query del thunder
                }
            });       
            if(!buscardetalle){//el signo de admiracion significa si esta vacio o es false
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado un registro con el ID ' + id;
                msj.errores = '';
                MSJ(res,500,msj);
            }
            else{
                buscardetalle.idusuario = idusuario;
                await buscardetalle.save();

                msj.estado = 'correcto';
                msj.mensaje = 'Detalle pedido actualizado correctamente';
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
        const {id} = req.query;
        try { 
            var buscardetalle = await modeloPedidosElaborados.findOne({
                where: {
                    iddetallepedido: id
                }
            });       
            if(!buscardetalle){
                msj.estado = 'error';
                msj.mensaje = 'No se ha encontrado el registro';
                msj.errores = '';
                MSJ(res,500,msj);
            }
            else{
                await buscardetalle.destroy({
                    where: {
                        iddetallepedido: id
                    }
                });
                msj.estado = 'correcto';
                msj.mensaje = 'Se ha eliminado el registro correctamente';
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



exports.Inicio = async (req, res)=>{
    const listamodulos = [
        {modulo: "Pedidos Elaborados",
            ruta: "/api/pedidos/pedidoselaborados", 
            metodo: "GET",
            parametros: "",
            descripcion: "Inicio del modulo pedidos elaborados"},
        {modulo: "Pedidos Elaborados listar",
            ruta: "/api/pedidos/pedidoselaborados/listar",
            metodo: "GET",
            descripcion: "Lista los pedidos elaborados"
        },
        {modulo: "Pedidos Elaborados guardar",
            ruta: "/api/pedidos/pedidoselaborados/guardar",
            metodo: "POST",
            parametros: "iddetallepedido, idusuario",
            descripcion: "Guarda los pedidos elaborados"
        },
        {
            modulo:"Pedidos Elaborados",
            ruta:"/api/pedidos/pedidoselaborados/guardarbulk",
            metodo:"POST",
            parametros: "iddetallepedido, idusuario",
            estructura:'[{iddetallepedido,idusuario},{iddetallepedido,idusuario}]',
            descripcion:"Guarda DetallesPedido en bulk/lotes/granel"
        },
        {modulo: "Pedidos Elaborados editar",
            ruta: "/api/pedidos/pedidoselaborados/editar",
            metodo: "PUT",
            query: "id",
            parametros: "iddetallepedido, idusuario, fechahora",
            descripcion: "Edita los pedidos elaborados"
        },
        {modulo: "Pedidos Elaborados eliminar",
            ruta: "/api/pedidos/pedidoselaborados/eliminar",
            metodo: "DEL",
            query: "id",
            descripcion: "Elimina los pedidos elaborados"
        },
    ];

    const datos = {
        api: "API-SIFCON",
        segmento: "Pedidos Elaborados",
        descripcion: "CRUD DE PEDIDOS ELABORADOS",
        propiedad: "SIGRES",
        desarrollador: "Oscar Andree Varela Godoy",
        colaboradores: "",
        fecha: "30/06/2022",
        listamodulos
    };
    res.json(datos);
}