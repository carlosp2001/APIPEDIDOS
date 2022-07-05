/*-----------By: Idaly Manzanares 0209200201095-----------*/ 

const { DataTypes } = require("sequelize");
const db = require('../configuraciones/db');

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
        idpedidomesa:{
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
/*
pedidos.hasMany(pedidos_mesa,{
    foreignKey: 'idpedido',
    otherKey: 'idpedido'
});
pedidos_mesa.belongsTa(pedidos ,{
    foreignKey: 'idpedido',
    otherKey: 'idpedido'
});
clientes.hasMany(pedidos_mesa,{
    foreignKey: 'idpedido',
    otherKey: 'idpedido'
});
*/

pedidos_mesa.sync().then(
    () => console.log("Sincronizacion Completa")
);

module.exports = pedidos_mesa;