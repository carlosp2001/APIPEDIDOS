const {DataTypes} = require("sequelize");
const db = require("../configuraciones/db");
const pedidos = require("./modeloPedidos");
//const facturas = require("./modeloFacturas");

const pedidos_x_ventas = db.define(
  "pedidos_x_ventas",
  {
    NumeroFactura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NumeroPedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
  },
  {
    tableName: "pedidos_x_ventas",
    timestamps: false,
  }
);

pedidos.hasMany(PedidosyVentas, {
  foreignKey: 'NumeroPedido',
  otherKey: 'NumeroPedido'
});

PedidosyVentas.belongsTo(pedidos, {
  foreignKey: 'NumeroPedido',
  otherKey: 'NumeroPedido'
});

/* facturas.hasMany(PedidosyVentas, {
  foreignKey: 'NumeroFactura',
  otherKey: 'NumeroFactura'
});

PedidosyVentas.belongsTo(facturas, {
  foreignKey: 'NumeroFactura',
  otherKey: 'NumeroFactura'
});
 */
pedidos_x_ventas.sync().then(() => console.log("Sincronizacion Completa"));
module.exports = pedidos_x_ventas;
