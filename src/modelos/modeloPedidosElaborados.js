const {DataTypes}=require('sequelize')
const db = require('../configuraciones/db')
const pedidosdetalle = require('./modeloDetallePedidos')
//const usuarios = require('./modeloUsuarios')
//modelo es donde se genera o crea la tabla de la bdd para que la api conozca los campos que lleva
//con el const pedidos_elaborados le indicamos los campos de la tabla


const pedidos_elaborados = db.define(
    'pedidos_elaborados',
    {
        iddetallepedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fechahora: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW //default=cuando se ingresa un nuevo registro, el valor sera la fecha actual de cuando se ingrese
        }
    },
    {
        tableName:'pedidos_elaborados', //aqui le indicamos el nombre a la tabla
        timestamps: false //para no agg campos de la fecha actual
    }
);

pedidosdetalle.hasMany(pedidos_elaborados, {
    foreignKey: 'iddetallepedido',
    otherKey: 'idregistro'
});
pedidos_elaborados.belongsTo(pedidosdetalle, {
    foreignKey: 'iddetallepedido',
    otherKey: 'iddetallepedido'
});
/* usuarios.hasMany(pedidos_elaborados, {
    foreignKey: 'idusuario',
    otherKey: 'idregistro'
});
pedidos_elaborados.belongsTo(usuarios, {
    foreignKey: 'idregistro',
    otherKey: 'idusuario'
}); */

//con el sync creamos la trabla desde el visual
pedidos_elaborados.sync().then(
    () => console.log("Sincronizacion Completa")
);

module.exports = pedidos_elaborados;