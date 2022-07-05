const sequelize = require('sequelize');
const db = new sequelize(
    'sigresdesarrollo',
    'inventario',
    'Inventario1@',
    {
        host: 'desofiw.xyz',
        dialect: 'mysql',
        port: 4306,
    }
);


module.exports = db;  