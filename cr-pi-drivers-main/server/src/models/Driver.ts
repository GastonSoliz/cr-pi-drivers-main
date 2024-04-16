const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
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
