const {Router}=require('express');
const {body, query} = require('express-validator');
const passport = require('../configuraciones/passport');

const controladorDetallePedido = require('../controladores/controladorDetallePedido');
const rutas = Router();


rutas.get('/', controladorDetallePedido.Inicio)
rutas.get('/listar',passport.ValidarAutenticado, controladorDetallePedido.Listar);

rutas.post('/guardar',passport.ValidarAutenticado, 
body('NumeroPedido')
.notEmpty().withMessage('El NumeroPedido es requerido'),

body('CodigoProducto')
.notEmpty().withMessage('El CodigoProducto es requerido'),

body('Cantidad')
.notEmpty().withMessage('La Cantidad es requerida')
.isInt().withMessage('La Cantidad debe ser un numero entero'),
controladorDetallePedido.Guardar);

rutas.post('/guardarbulk',passport.ValidarAutenticado,
body().isArray().withMessage("Debe enviar un arreglo"),
body('*.NumeroPedido')
.notEmpty().withMessage("No se aceptan valores vacios para el NumeroPedido")
.isInt().withMessage("El NumeroPedido debe ser un numero entero"),
body('*.CodigoProducto')
.notEmpty().withMessage("No se aceptan valores vacios para el CodigoProducto")
.isInt().withMessage("El CodigoProducto debe ser un numero entero"),
body('*.Cantidad')
.notEmpty().withMessage("No se aceptan valores vacios para el Cantidad")
.isInt().withMessage("El Cantidad debe ser un numero entero"),
controladorDetallePedido.GuardarBulk)

module.exports = rutas;

rutas.put('/editar',passport.ValidarAutenticado, 
query('idregistro')
.notEmpty().withMessage('El idregistro es requerido')
.isInt().withMessage('El idregistro debe ser un numero entero'),

body('NumeroPedido')
.notEmpty().withMessage('El NumeroPedido es requerido'),

body('CodigoProducto')
.notEmpty().withMessage('El CodigoProducto es requerido'),

body('Cantidad')
.notEmpty().withMessage('La Cantidad es requerida')
.isInt().withMessage('La Cantidad debe ser un numero entero'),
controladorDetallePedido.Editar)

rutas.delete('/eliminar',passport.ValidarAutenticado,
query('idregistro')
.notEmpty().withMessage('El idregistro es requerido')
.isInt().withMessage('El idregistro debe ser un numero entero'),
controladorDetallePedido.Eliminar)

module.exports = rutas;