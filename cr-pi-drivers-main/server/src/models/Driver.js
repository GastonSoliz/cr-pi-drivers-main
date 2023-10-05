const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Driver",
    {
      id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: { type: DataTypes.TEXT, allowNull: false },
      nationality: { type: DataTypes.STRING, allowNull: false },
      birthdate: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
