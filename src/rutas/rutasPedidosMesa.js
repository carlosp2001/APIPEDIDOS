/*-----------By: Idaly Manzanares 0209200201095-----------*/ 

const {Router} = require('express');
const {body, query} = require('express-validator');

const controladorPedidosMesa = require('../controladores/controladorPedidosMesa');
const rutas = Router();
rutas.get('/listar', controladorPedidosMesa.Listar);

rutas.post('/guardar',
body('idpedido')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
        .isInt().withMessage("El id de pedido debe ser un numero entero"),
body('idregistro').notEmpty().withMessage("No se aceptan valores vacios para el id del registro"), controladorPedidosMesa.Guardar);

rutas.put('/editar',
query('idregistro')
.notEmpty().withMessage("No se aceptan valores vacios para el id del registro")
.isInt().withMessage("El id del registro debe ser un entero"),
body('idpedido')
.notEmpty().withMessage("No se aceptan valores vacios para el id de pedido")
.isInt().withMessage("El id de pedido debe ser un numero entero"),
body('cuenta')
.notEmpty().withMessage("No se aceptan valores vacios para e; valor de la cuenta")
.isInt().withMessage("El valor de la cuenta debe ser un numero entero"),
body('nombrecuenta')
.notEmpty().withMessage('No se aceptan valores vacios para el nombre de la cuenta')
.isLength({min: 3}).withMessage('La cantidad minima de caracteres son 3, para el nombre de la cuenta'),
controladorPedidosMesa.Editar);

rutas.delete('/eliminar',
query('idregistro')
.notEmpty().withMessage("No se aceptan valores vacios para el id de registro")
.isInt().withMessage("El id de registro debe ser un entero"),
controladorPedidosMesa.Eliminar);

module.exports = rutas;
