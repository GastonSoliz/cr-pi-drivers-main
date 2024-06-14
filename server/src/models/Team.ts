import { Sequelize } from "sequelize";

const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize: Sequelize) => {
  sequelize.define(
    "Team",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );
};
