const {Router}=require('express');
const {body, query} = require('express-validator');

const controladorpedidoselaborados = require('../controladores/controladorpedidoselab');
const rutas = Router();



//*Listar
rutas.get('/listar', controladorpedidoselaborados.Listar);
rutas.get('/', controladorpedidoselaborados.Inicio)


//*Guardar
rutas.post('/guardar',
body ('iddetallepedido')
.notEmpty().withMessage('Debe enviar idpedidoselaborados') //con esto validamos de que el campo no vaya vacio 
.isInt().withMessage('El ID del pedido detalle debe ser un numero entero'),//con esta validamos que solo acepte numeros enteros
body ('idusuario')
.notEmpty().withMessage('Debe enviar idpedidoselaborados') //con esto validamos de que el campo no vaya vacio 
.isInt().withMessage('El ID del pedido detalle debe ser un numero entero'),//con esta validamos que solo acepte numeros enteros
controladorpedidoselaborados.Guardar); 


rutas.post('/guardarbulk',
body().isArray().withMessage("Debe enviar un arreglo"),
body('*.iddetallepedido')
.notEmpty().withMessage("No se aceptan valores vacios para el iddetallepedido")
.isInt().withMessage("El iddetallepedido debe ser un numero entero"),
body('*.idusuario')
.notEmpty().withMessage("No se aceptan valores vacios para el idUsuario")
.isInt().withMessage("El idUsuario debe ser un numero entero"),
controladorpedidoselaborados.GuardarBulk)

//*Editar
rutas.put('/editar',
query('id')
.notEmpty().withMessage('El ID del detalle pedido no puede estar vacio')
.isInt().withMessage('El ID del detalle pedido debe ser un numero entero'),

body ('idusuario')
.notEmpty().withMessage('Debe enviar idpedidoselaborados') //con esto validamos de que el campo no vaya vacio 
.isInt().withMessage('El ID del pedido detalle debe ser un numero entero'),//con esta validamos que solo acepte numeros enteros
controladorpedidoselaborados.Editar);

//*Delete
rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('El ID del detalle pedido no puede estar vacio')
.isInt().withMessage('El ID del detalle pedido debe ser un numero entero'),
controladorpedidoselaborados.Eliminar);

module.exports = rutas;