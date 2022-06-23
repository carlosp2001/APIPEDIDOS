const { DataTypes } = require("sequelize");
const db = require('../configuraciones/db');
// const pedidos = require('./modeloPedidos');
// const clientes = require('./modeloClientes');
const pedidos_llevar = db.define(
    'pedidos_llevar',{
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
        idcliente:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            tableName: 'pedidos_llevar',
            timestamps: false
        }
        
);
// pedidos.hasMany(pedidos_llevar, {
//     foreignKey: 'idpedido',
//     otherKey: 'idpedido'
// });

// pedidos_llevar.belongsTo(pedidos, {
//     foreignKey: 'idpedido',
//     otherKey: 'idpedido'
// });

// clientes.hasMany(pedidos_llevar, {
//     foreignKey: 'idcliente',
//     otherKey: 'idcliente'
// });

// pedidos_llevar.belongsTo(clientes, {
//     foreignKey: 'idcliente',
//     otherKey: 'idcliente'
// });

pedidos_llevar.sync().then(
    () => console.log("Sincronizacion Completa")
);

module.exports = pedidos_llevar;