const Usuario = require("../modelos/modeloUsuarios");
const { Op } = require('sequelize');
const MSJ = require("../componentes/mensajes");
const validar = require("../componentes/validar");
const passport = require('../configuraciones/passport');
const express = require("express");

exports.InicioSesion = async (req, res) => {
  var msj = validar(req);

  const { usuario, contrasena } = req.body;
  var buscarUsuario = await Usuario.findOne({
    where: {
      LoginUsuario: usuario,
      Contrasena: contrasena
    }
  })

  if (!buscarUsuario) {
    msj.estado = 'precaucion';
    msj.mensaje = 'La peticion no se ejecuto';
    msj.errores = [
      {
        mensaje: "El usuario o contraseña son incorrectos",
        parametro: "Usuario"
      }
    ];
    MSJ(res, 500, msj);
  } else {
    const token = passport.getToken({ idregistro: buscarUsuario.idregistro });
    const data = {
      token: token,
      usuario: {
        LoginUsuario: buscarUsuario.LoginUsuario,
        Contrasena: buscarUsuario.Contrasena
      }
    };
    msj.estado = 'Correcto';
    msj.mensaje = 'Peticion ejecutada correctamente';
    msj.datos = data;
    MSJ(res, 200, msj);

  }
};


