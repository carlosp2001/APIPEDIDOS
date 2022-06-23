const {Router} = require('express');
const {body, query} = require('express-validator');

const controladorPedidosyVentas = require('../controladores/controladorPedidosyVentas');
const rutas = Router();
rutas.get('/listar', controladorPedidosyVentas.Listar);

rutas.post('/guardar',
body('NumeroFactura')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
        .isInt().withMessage("El id de pedido debe ser un numero entero"),
body('NumeroPedido').notEmpty().withMessage("No se aceptan valores vacios para el id del cliente"), controladorPedidosyVentas.Guardar);

rutas.put('/editar',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id del registro")
.isInt().withMessage("El id del registro debe ser un entero"),
body('NumeroFactura')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
        .isInt().withMessage("El id de pedido debe ser un numero entero"),
body('NumeroPedido').notEmpty().withMessage("No se aceptan valores vacios para el id del cliente"), controladorPedidosyVentas.Editar);

rutas.delete('/eliminar',
query('NumeroFactura')
.notEmpty().withMessage("No se aceptan valores vacios para el numero de factura")
.isInt().withMessage("El numero de factura debe ser un entero"),
controladorPedidosyVentas.Eliminar);

module.exports = rutas;