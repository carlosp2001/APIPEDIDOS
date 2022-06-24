const {DataTypes} = require("sequelize");
const db = require("../configuraciones/db");

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
PedidosyVentas.sync().then(() => console.log("Sincronizacion Completa"));
module.exports = PedidosyVentas;
