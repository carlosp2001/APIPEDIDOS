const {DataTypes}=require('sequelize')
const db = require('../configuraciones/db')


const entrega_pedido = db.define(
    'entrega_pedido',
    {
        iddetalle_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fechahora: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW 
        },
        identrega: {
            type: DataTypes.INTEGER,
            allowNull: false           
        }
    },
    {
        tableName:'entrega_pedido', //aqui le indicamos el nombre a la tabla
        timestamps: false //para no agg campos de la fecha actual
    }
);

//con el sync creamos la trabla desde el visual
entrega_pedido.sync().then(
    () => console.log("Sincronizacion Completa")
);

module.exports = entrega_pedido;