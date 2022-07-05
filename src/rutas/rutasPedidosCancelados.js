//rutaspedidoscancelados trabajado por francis lara.
const {Router} = require('express');
const {body, query} = require('express-validator');

const controladorPedidosCancelados = require ('../controladores/controladorPedidosCancelados');
const rutas = Router();

rutas.get('/listar', controladorPedidosCancelados.Listar);

rutas.get('/', controladorPedidosCancelados.Inicio);

rutas.post('/guardar',
query('numeropedido')
.notEmpty().withMessage('el numero de pedido cancelado no puede estar vacio')
.isInt().withMessage('el numero del pedido debe ser un numero entero'),
body('usuario')
.notEmpty().withMessage('Debe ingresar el nombre del pedido cancelado').isInt().withMessage("El Id del Usuario debe ser un numero"),
controladorPedidosCancelados.Guardar)

rutas.post('/guardarbulk',
body().isArray().withMessage("Debe enviar un arreglo"),
body('*.numeropedido')
.notEmpty().withMessage("No se aceptan valores vacios para el numeropedido")
.isInt().withMessage("El numeropedido debe ser un numero entero"),
body('*.usuario')
.notEmpty().withMessage("No se aceptan valores vacios para el usuario")
.isInt().withMessage("El usuario debe ser un numero entero"),
controladorPedidosCancelados.GuardarBulk)

rutas.put('/editar',
query('id')
.notEmpty().withMessage('El numero del pedido no puede estar vacio')
.isInt().withMessage('el numero del pedido debe ser un entero'),
body ('usuario')
        .notEmpty().withMessage('Debe enviar el usuario para editar algun pedido cancelado').isInt().withMessage("El id del Usuario debe ser un numero"),
body('fechahora').notEmpty().withMessage("La fecha no debe estar vacia"),
controladorPedidosCancelados.Editar);

rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('el numero de pedido cancelado no puede estar vacio')
.isInt().withMessage('el numero del pedido debe ser un numero entero'),
controladorPedidosCancelados.Eliminar);

module.exports = rutas;