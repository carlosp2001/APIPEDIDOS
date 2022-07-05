const {DataTypes}=require('sequelize')
const db = require('../configuraciones/db')

const pedidosdetalle = require('./modeloDetallePedidos')

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


pedidosdetalle.hasMany(entrega_pedido, {
    foreignKey: 'iddetalle_pedido',
    otherKey: 'idregistro'
});
 entrega_pedido.belongsTo(pedidosdetalle, {
    foreignKey: 'iddetalle_pedido',
    otherKey: 'iddetalle_pedido'
});

//con el sync creamos la trabla desde el visual
entrega_pedido.sync().then(
    () => console.log("Sincronizacion Completa")
);

module.exports = entrega_pedido;