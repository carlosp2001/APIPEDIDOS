const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/pedidosLlevar', require('./rutas/rutasPedidosLlevar'));
app.use('/api/detallepedidos',require('./rutas/rutasDetallePedido'));
app.use('/api/pedidosyVentas', require('./rutas/rutasPedidosyVentas'));

app.listen(app.get('port'), () => {
    console.log("Servidor inciado en el puerto " + app.get('port'));
});
