//modelo trabajado por francis lara
const { DataTypes} = require ("sequelize");
const db = require ('../configuraciones/db');
const pedidosdetalle = require('./modeloDetallePedidos');
//const usuarios = require('./modeloUsuarios');


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

 pedidosdetalle.hasMany(pedidos_cancelados, {
    foreignKey: 'numeropedido',
    otherKey: 'idregistro'
});
 pedidos_cancelados.belongsTo(pedidosdetalle, {
    foreignKey: 'numeropedido',
    otherKey: 'numeropedido'
});

/* usuarios.hasMany(pedidos_cancelados, {
    foreignKey: 'usuario',
    otherKey: 'idregistro'
});

pedidos_cancelados.belongsTo(usuarios, {
    foreignKey: 'idregistro',
    otherKey: 'usuario'
}); */
pedidos_cancelados.sync().then(
    () => console.log("Tabla de pedidos Cancelados sincronizada")
);


module.exports = pedidos_cancelados;


