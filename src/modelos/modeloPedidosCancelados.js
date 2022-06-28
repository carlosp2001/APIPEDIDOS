const { DataTypes} = require ("sequelize");
const db = require ('../configuraciones/db');


const pedidos_cancelados = db.define(
    'pedidos_cancelados',
    {
        numeropedido:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fechahora :{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tablename: 'pedidos_cancelados',
        timestamps: false
    }
);
pedidos_cancelados.sync().then(
    () => console.log("Sincronizacion completa")
);


module.exports = pedidos_cancelados;


