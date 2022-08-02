const {Router}=require('express');
const {body, query} = require('express-validator');

const controladorAutenticacion = require('../controladores/controladorAutenticacion');
const rutas = Router();


rutas.post('/login', controladorAutenticacion.InicioSesion)

module.exports = rutas;