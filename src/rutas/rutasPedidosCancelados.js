const {Router} = require('express');
const {body, query} = require('express-validator');

const controladorPedidosCancelados = require ('../controladores/controladorPedidosCancelados');
const rutas = Router();

rutas.get('/Listar', controladorPedidosCancelados.Listar);

rutas.post('/guardar',
body('usuario')
.notEmpty().withMessage('Debe ingresar el nombre del pedido cancelado')
.isLength({min}).withMessage('El nombre del pedido cancelado debe superar los 3 caracteres'),
controladorPedidosCancelados.Guardar)

rutas.put('/editar',
query('numeropedido')
.notEmpty().withMessage('El numero del pedido no puede estar vacio')
.isInt().withMessage('el numero del pedido debe ser un entero'),

body ('usuario')
.notEmpty().withMessage('Debe enviar el usuario para editar algun pedido cancelado')
.isLength({min:3}).withMessage('el nombre del usuario debe tener mas de 3 caracteres'),
controladorPedidosCancelados.Editar);

rutas.delete('/eliminar',
query('numeropedido')
.notEmpty().withMessage('el numero de pedido cancelado no puede estar vacio')
.isInt().withMessage('el numero del pedido debe ser un numero entero'),
controladorPedidosCancelados.Eliminar);

module.exports = rutas;