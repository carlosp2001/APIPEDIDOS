const sequelize = require('sequelize');
const db = new sequelize(
    'sigresdesarrollo',
    'inventario',
    'Inventario1@',
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        port: process.env.DB_PORT,
        "connectionTimeout": 0,
        "pool":{
            "max": 1,
            "min": 1,
            "idle": 200000,
            "acquire": 200000
        },
        "retry":{"max": 3},
        "dialectOptions": {
            "requestTimeout": 0,
            "connectTimeout": 0,
        },
    }
    
);


module.exports = db;  