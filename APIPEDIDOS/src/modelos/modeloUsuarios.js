const { DataTypes } = require('sequelize');
const db = require('../configuraciones/db');
const usuarios = db.define(
    'usuarios',
    {
        idregistro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        LoginUsuario: {
            type: DataTypes.TEXT(30),
            allowNull: false
        },
        Contrasena: {
            type: DataTypes.TEXT(250),
            allowNull: false
        }

    },
    {
        tableName: 'usuarios',
        timestamps: false //Para que no se genere la columna de fecha de creacion y actualizacion
    }
);

usuarios.sync()
.then(() => console.log('Tabla de Usuarios sincronizada'));

module.exports = usuarios;