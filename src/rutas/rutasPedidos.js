const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorPedidos = require('../controladores/controladorPedidos');
const rutas = Router();
const passport = require('../configuraciones/passport');
rutas.get('/', controladorPedidos.Inicio);
rutas.get('/listar',passport.ValidarAutenticado,passport.ValidarAutenticado, controladorPedidos.Listar);


rutas.post('/guardar', passport.ValidarAutenticado,
body('idmesero')
.notEmpty().withMessage('No se aceptan valores vacios para el id del mesero')
.isInt().withMessage('El id del mesero debe ser entero'),
body('Estacion')
.notEmpty().withMessage('No se aceptan valores vacios para la estacion')
.isInt().withMessage('La estacion debe ser entero'),
body('activo')
.notEmpty().withMessage('No se aceptan valores vacios para el estado del pedido')
.isBoolean().withMessage('El estado del pedido debe ser booleano'),
body('modalidad')
.notEmpty().withMessage('No se aceptan valores vacios para la modalidad')
.isIn(['ME','DO','LL']).withMessage('La modalidad debe ser ME, DO o LL'),
body('estado')
.notEmpty().withMessage('No se aceptan valores vacios para el estado del pedido')
.isIn(['AAA','NNN','SNN','SSN','SNS','SSS','NSS','NSN']).withMessage('El estado del pedido debe ser AAA, NNN, SNN, SSN, SNS, SSS, NSS, NSN'),
controladorPedidos.Guardar);



rutas.put('/editar',passport.ValidarAutenticado,
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para el Numero del pedido')
.isInt().withMessage('El Numero del pedido debe ser entero'),
body('idmesero')
.notEmpty().withMessage('No se aceptan valores vacios para el id del mesero')
.isInt().withMessage('El id del mesero debe ser entero'),
body('Estacion')
.notEmpty().withMessage('No se aceptan valores vacios para la estacion')
.isInt().withMessage('La estacion debe ser entero'),
body('activo')
.notEmpty().withMessage('No se aceptan valores vacios para el estado del pedido')
.isBoolean().withMessage('El estado del pedido debe ser booleano'),
body('modalidad')
.notEmpty().withMessage('No se aceptan valores vacios para la modalidad')
.isIn(['ME','DO','LL']).withMessage('La modalidad debe ser ME, DO o LL'),
body('estado')
.notEmpty().withMessage('No se aceptan valores vacios para el estado del pedido')
.isIn(['AAA','NNN','SNN','SSN','SNS','SSS','NSS','NSN']).withMessage('El estado del pedido debe ser AAA, NNN, SNN, SSN, SNS, SSS, NSS, NSN'),
controladorPedidos.Editar);


rutas.delete('/eliminar',passport.ValidarAutenticado,
query('id')
.notEmpty().withMessage('No se aceptan valores vacios para el Numero del pedido')
.isInt().withMessage('El Numero del pedido debe ser entero'),
controladorPedidos.Eliminar);


module.exports = rutas;