const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      healthScore: {
        type: DataTypes.INTEGER,
      },
      steps: {
        type: DataTypes.TEXT,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
