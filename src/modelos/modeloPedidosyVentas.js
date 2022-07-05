const {DataTypes} = require("sequelize");
const db = require("../configuraciones/db");
const pedidos = require("./modeloPedidos");
//const facturas = require("./modeloFacturas");

const PedidosyVentas = db.define(
  "PedidosyVentas",
  {
    NumeroFactura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NumeroPedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "PedidosyVentas",
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
PedidosyVentas.sync().then(() => console.log("Sincronizacion Completa"));
module.exports = PedidosyVentas;
