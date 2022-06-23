const {Router} = require('express');
const {body, query} = require('express-validator');

const controladorPedidosLlevar = require('../controladores/controladorPedidosLlevar');
const rutas = Router();
rutas.get('/listar', controladorPedidosLlevar.Listar);

rutas.post('/guardar',
body('idpedido')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
        .isInt().withMessage("El id de pedido debe ser un numero entero"),
body('idcliente').notEmpty().withMessage("No se aceptan valores vacios para el id del cliente"), controladorPedidosLlevar.Guardar);

rutas.put('/editar',
query('id')
.notEmpty().withMessage("No se aceptan valores vacios para el id del registro")
.isInt().withMessage("El id del registro debe ser un entero"),
body('idpedido')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
        .isInt().withMessage("El id de pedido debe ser un numero entero"),
body('idcliente').notEmpty().withMessage("No se aceptan valores vacios para el id del cliente"), controladorPedidosLlevar.Editar);

rutas.delete('/eliminar',
query('idregistro')
.notEmpty().withMessage("No se aceptan valores vacios para el id de cargos")
.isInt().withMessage("El id del cargo debe ser un entero"),
controladorPedidosLlevar.Eliminar);

module.exports = rutas;
