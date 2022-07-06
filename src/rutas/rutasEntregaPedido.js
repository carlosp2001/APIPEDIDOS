const {Router}=require('express');
const {body, query} = require('express-validator');
const passport = require('../configuraciones/passport');

const controladorEntregaPedido = require('../controladores/controladorEntregaPedido');
const rutas = Router();



//*Listar
rutas.get('/listar',passport.ValidarAutenticado, controladorEntregaPedido.Listar);
rutas.get('/', controladorEntregaPedido.Inicio)



rutas.post('/guardar',passport.ValidarAutenticado,
body ('iddetalle_pedido')
.notEmpty().withMessage('Debe enviar iddetalle_pedido') 
.isInt().withMessage('El iddetalle_pedido debe ser un numero entero'),
body ('usuario')
.notEmpty().withMessage('Debe enviar usuario') 
.isInt().withMessage('El ID del usuario debe ser un numero entero'),
body ('identrega')
.notEmpty().withMessage('Debe enviar identrega') 
.isInt().withMessage('El identrega debe ser un numero entero'),
controladorEntregaPedido.Guardar); 


rutas.post('/guardarbulk',passport.ValidarAutenticado,
body().isArray().withMessage("Debe enviar un arreglo"),
body('*.iddetalle_pedido')
.notEmpty().withMessage("No se aceptan valores vacios para el iddetalle_pedido")
.isInt().withMessage("El iddetalle_pedido debe ser un numero entero"),
body('*.usuario')
.notEmpty().withMessage("No se aceptan valores vacios para el usuario")
.isInt().withMessage("El usuario debe ser un numero entero"),
body('*.identrega')
.notEmpty().withMessage("No se aceptan valores vacios para el identrega")
.isInt().withMessage("El identrega debe ser un numero entero"),
controladorEntregaPedido.GuardarBulk)

//*Editar
rutas.put('/editar',passport.ValidarAutenticado,
query('id')
.notEmpty().withMessage('El iddetalle_pedido no puede estar vacio')
.isInt().withMessage('El iddetalle_pedido debe ser un numero entero'),

body ('usuario')
.notEmpty().withMessage('Debe enviar usuario') 
.isInt().withMessage('El ID del usuario debe ser un numero entero'),
body ('identrega')
.notEmpty().withMessage('Debe enviar identrega') 
.isInt().withMessage('El identrega debe ser un numero entero'),
controladorEntregaPedido.Editar);

//*Delete
rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('El iddetalle_pedido no puede estar vacio')
.isInt().withMessage('El iddetalle_pedido debe ser un numero entero'),
controladorEntregaPedido.Eliminar);

module.exports = rutas;