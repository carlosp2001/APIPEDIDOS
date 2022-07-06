const {Router} = require('express');
const {body, query} = require('express-validator');
const passport = require('../configuraciones/passport');

const controladorPedidosyVentas = require('../controladores/controladorPedidosyVentas');
const rutas = Router();

rutas.get('/', controladorPedidosyVentas.Inicio);

rutas.get('/listar',passport.ValidarAutenticado, controladorPedidosyVentas.Listar);

rutas.post('/guardar',passport.ValidarAutenticado,
body('NumeroFactura')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
        .isInt().withMessage("El id de pedido debe ser un numero entero"),
body('NumeroPedido').notEmpty().withMessage("No se aceptan valores vacios para el id del cliente"), controladorPedidosyVentas.Guardar);

rutas.put('/editar',passport.ValidarAutenticado,
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id del registro")
.isInt().withMessage("El id del registro debe ser un entero"),
body('NumeroFactura')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
        .isInt().withMessage("El id de pedido debe ser un numero entero"),
body('NumeroPedido').notEmpty().withMessage("No se aceptan valores vacios para el id del cliente"), controladorPedidosyVentas.Editar);

rutas.delete('/eliminar',passport.ValidarAutenticado,
query('NumeroFactura')
.notEmpty().withMessage("No se aceptan valores vacios para el numero de factura")
.isInt().withMessage("El numero de factura debe ser un entero"),
controladorPedidosyVentas.Eliminar);

rutas.post('/guardarbulk',passport.ValidarAutenticado,
body().isArray().withMessage("Debe enviar un arreglo"),
body('*.NumeroFactura')
.notEmpty().withMessage("No se aceptan valores vacios para el NumeroFactura")
.isInt().withMessage("El NumeroFactura debe ser un numero entero"),
body('*.NumeroPedido')
.notEmpty().withMessage("No se aceptan valores vacios para el NumeroPedido")
.isInt().withMessage("El NumeroPedido debe ser un numero entero"),
controladorPedidosyVentas.GuardarBulk)

module.exports = rutas;