const { Router } = require('express');
const rutas = Router();
rutas.use('/pedidosllevar', require('./rutasPedidosLlevar'));
rutas.use('/detallepedidos', require('./rutasDetallePedido'));
rutas.use('/pedidos', require('./rutasPedidos'));
rutas.use('/pedidoscancelados', require('./rutasPedidosCancelados'));
rutas.use('/pedidoselaborados', require('./rutaspedidoselaborados'));
rutas.use('/pedidosmesa', require('./rutasPedidosMesa'));
rutas.use('/pedidosyventas', require('./rutasPedidosyVentas'));
rutas.use('/entregapedido', require('./rutasEntregaPedido'));
rutas.use('/autenticacion', require('./rutasAutenticacion'));
module.exports = rutas;