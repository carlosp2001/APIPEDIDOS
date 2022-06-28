const {Router} = require('express');
const {body, query} = require('express-validator');

const controladorPedidosCancelados = require ('../controladores/controladorPedidosCancelados');
const rutas = Router();

rutas.get('/Listar', controladorPedidosCancelados.Listar);

rutas.post('/guardar',
body('usuario')
.notEmpty().withMessage('Debe ingresar el nombre del pedido cancelado').isInt().withMessage("El Id del Usuario debe ser un numero"),
controladorPedidosCancelados.Guardar)

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