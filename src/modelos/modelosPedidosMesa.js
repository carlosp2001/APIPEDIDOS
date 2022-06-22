const { DataTypes } = require("sequelize");
const db = require('../configuraciones/db');
const pedidos = require('./modeloPedidos');

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
        cuenta:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombrecuenta:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'pedidos_mesa',
        timestamps: false
    }
);
