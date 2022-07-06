const {Router} = require('express');
const {body, query} = require('express-validator');
const passport = require('../configuraciones/passport');

const controladorPedidosLlevar = require('../controladores/controladorPedidosLlevar');
const rutas = Router();
rutas.get('/listar',passport.ValidarAutenticado, controladorPedidosLlevar.Listar);

rutas.get('/', controladorPedidosLlevar.Inicio);

rutas.post('/guardar',passport.ValidarAutenticado,
body('idpedido')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
        .isInt().withMessage("El id de pedido debe ser un numero entero"),
body('idcliente').notEmpty().withMessage("No se aceptan valores vacios para el id del cliente"), controladorPedidosLlevar.Guardar);

rutas.put('/editar',passport.ValidarAutenticado,
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id del registro")
.isInt().withMessage("El id del registro debe ser un entero"),
body('idpedido')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
        .isInt().withMessage("El id de pedido debe ser un numero entero"),
body('idcliente').notEmpty().withMessage("No se aceptan valores vacios para el id del cliente"), controladorPedidosLlevar.Editar);

rutas.delete('/eliminar',passport.ValidarAutenticado,
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id de registro")
.isInt().withMessage("El id de registro debe ser un entero"),
controladorPedidosLlevar.Eliminar);

module.exports = rutas;
