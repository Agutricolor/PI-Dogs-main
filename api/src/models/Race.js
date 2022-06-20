const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Race",
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false,
        get() {
          return `${this.getDataValue("height")} cm`;
        },
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        get() {
          return `${this.getDataValue("weight")} kgs`;
        },
      },
      lifeYears: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
