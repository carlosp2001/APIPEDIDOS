const {Router}=require('express');
const {body, query} = require('express-validator');

const controladorDetallePedido = require('../controladores/controladorDetallePedido');
const rutas = Router();



rutas.get('/listar', controladorDetallePedido.Listar);

rutas.post('/guardar', 
body('NumeroPedidos')
.notEmpty().withMessage('El NumeroPedidos es requerido'),

body('CodigoProducto')
.notEmpty().withMessage('El CodigoProducto es requerido'),

body('Cantidad')
.notEmpty().withMessage('La Cantidad es requerida')
.isInt().withMessage('La Cantidad debe ser un numero entero'),
controladorDetallePedido.Guardar);

rutas.put('/editar', 
query('idregistro')
.notEmpty().withMessage('El idregistro es requerido')
.isInt().withMessage('El idregistro debe ser un numero entero'),

body('NumeroPedidos')
.notEmpty().withMessage('El NumeroPedidos es requerido'),

body('CodigoProducto')
.notEmpty().withMessage('El CodigoProducto es requerido'),

body('Cantidad')
.notEmpty().withMessage('La Cantidad es requerida')
.isInt().withMessage('La Cantidad debe ser un numero entero'),
controladorDetallePedido.Editar)

rutas.delete('/eliminar',
query('idregistro')
.notEmpty().withMessage('El idregistro es requerido')
.isInt().withMessage('El idregistro debe ser un numero entero'),
controladorDetallePedido.Eliminar)

module.exports = rutas;