const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
app.set('port',3001);
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/pedidosmesa', require('./rutas/rutasPedidosMesa'));
app.listen(app.get('port'), () => {
    console.log("Servidor inciado en el puerto " + app.get('port'));
});
