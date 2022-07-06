//rutaspedidoscancelados trabajado por francis lara.
const {Router} = require('express');
const {body, query} = require('express-validator');
const passport = require('../configuraciones/passport');

const controladorPedidosCancelados = require ('../controladores/controladorPedidosCancelados');
const rutas = Router();

rutas.get('/listar',passport.ValidarAutenticado, controladorPedidosCancelados.Listar);

rutas.get('/', controladorPedidosCancelados.Inicio);

rutas.post('/guardar',passport.ValidarAutenticado,
body('numeropedido')
.notEmpty().withMessage('el numero de pedido cancelado no puede estar vacio')
.isInt().withMessage('el numero del pedido debe ser un numero entero'),
body('usuario')
.notEmpty().withMessage('Debe ingresar el nombre del pedido cancelado').isInt().withMessage("El Id del Usuario debe ser un numero"),
controladorPedidosCancelados.Guardar)

rutas.post('/guardarbulk',passport.ValidarAutenticado,
body().isArray().withMessage("Debe enviar un arreglo"),
body('*.numeropedido')
.notEmpty().withMessage("No se aceptan valores vacios para el numeropedido")
.isInt().withMessage("El numeropedido debe ser un numero entero"),
body('*.usuario')
.notEmpty().withMessage("No se aceptan valores vacios para el usuario")
.isInt().withMessage("El usuario debe ser un numero entero"),
controladorPedidosCancelados.GuardarBulk)

rutas.put('/editar',passport.ValidarAutenticado,
query('id')
.notEmpty().withMessage('El numero del pedido no puede estar vacio')
.isInt().withMessage('el numero del pedido debe ser un entero'),
body ('usuario')
        .notEmpty().withMessage('Debe enviar el usuario para editar algun pedido cancelado').isInt().withMessage("El id del Usuario debe ser un numero"),
body('fechahora').notEmpty().withMessage("La fecha no debe estar vacia"),
controladorPedidosCancelados.Editar);

rutas.delete('/eliminar',passport.ValidarAutenticado,
query('id')
.notEmpty().withMessage('el numero de pedido cancelado no puede estar vacio')
.isInt().withMessage('el numero del pedido debe ser un numero entero'),
controladorPedidosCancelados.Eliminar);

module.exports = rutas;