/*-----------By: Idaly Manzanares 0209200201095-----------*/ 

const { DataTypes } = require("sequelize");
const db = require('../configuraciones/db');
const pedidos = require('./modeloPedidos');
//const clientes = require('./modeloClientes');

const pedidos_mesa = db.define(
    'pedidos_mesa',{
        idregistro:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idpedido:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idmesa:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cuenta:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombrecuenta:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'pedidos_mesa',
        timestamps: false
    }
);
pedidos.hasMany(pedidos_mesa, {
    foreignKey: 'idpedido',
    otherKey: 'NumeroPedido'
});

pedidos_mesa.belongsTo(pedidos, {
    foreignKey: 'idpedido', 
    otherKey: 'idpedido'
});

/* clientes.hasMany(pedidos_mesa, {
    foreignKey: 'idmesa',
    otherKey: 'idmesa'
});

pedidos_mesa.belongsTo(mesas_x_area, {
    foreignKey: 'idmesa',
    otherKey: 'idmesa'
}); */

pedidos_mesa.sync().then(
    () => console.log("Tabla de pedidos Mesa sincronizada")
);

module.exports = pedidos_mesa;