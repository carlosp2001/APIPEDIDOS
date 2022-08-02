/*-----------By: Idaly Manzanares 0209200201095-----------*/

const { Router } = require("express");
const { body, query } = require("express-validator");
const passport = require('../configuraciones/passport');

const controladorPedidosMesa = require("../controladores/controladorPedidosMesa");
const rutas = Router();
rutas.get("/listar",passport.ValidarAutenticado, controladorPedidosMesa.Listar);

rutas.get("/", controladorPedidosMesa.Inicio);

rutas.post(
  "/guardar",passport.ValidarAutenticado,
  body("idpedido")
    .notEmpty()
    .withMessage("No se aceptan valores vacios para el id de pedido")
    .isInt()
    .withMessage("El id de pedido debe ser un numero entero"),
  body("idpedidomesa")
    .notEmpty()
    .withMessage("No se aceptan valores vacios para el id de pedido")
    .isInt()
    .withMessage("El id de pedido debe ser un numero entero"),
  body("cuenta")
    .notEmpty()
    .withMessage("No se aceptan valores vacios para el nro. de cuenta")
    .isInt()
    .withMessage("El id de pedido debe ser un numero entero"),
  body("nombrecuenta")
    .notEmpty()
    .withMessage("No se aceptan valores vacios para el nombre"),
  controladorPedidosMesa.Guardar
);

rutas.put(
  "/editar",passport.ValidarAutenticado,
  query("id")
    .notEmpty()
    .withMessage("No se aceptan valores vacios para el id del registro")
    .isInt()
    .withMessage("El id del registro debe ser un entero"),
  body("idpedido")
    .notEmpty()
    .withMessage("No se aceptan valores vacios para el id de pedido")
    .isInt()
    .withMessage("El id de pedido debe ser un numero entero"),
  body("cuenta")
    .notEmpty()
    .withMessage("No se aceptan valores vacios para e; valor de la cuenta")
    .isInt()
    .withMessage("El valor de la cuenta debe ser un numero entero"),
  body("nombrecuenta")
    .notEmpty()
    .withMessage("No se aceptan valores vacios para el nombre de la cuenta")
    .isLength({ min: 3 })
    .withMessage(
      "La cantidad minima de caracteres son 3, para el nombre de la cuenta"
    ),
  controladorPedidosMesa.Editar
);

rutas.delete(
  "/eliminar",passport.ValidarAutenticado,
  query("idregistro")
    .notEmpty()
    .withMessage("No se aceptan valores vacios para el id de registro")
    .isInt()
    .withMessage("El id de registro debe ser un entero"),
  controladorPedidosMesa.Eliminar
);

module.exports = rutas;
