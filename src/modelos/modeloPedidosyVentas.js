const {DataTypes} = require("sequelize");
const db = require("../configuraciones/db");

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
pedidos_x_ventas.sync().then(() => console.log("Sincronizacion Completa"));
module.exports = pedidos_x_ventas;
