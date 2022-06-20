const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("race", {
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
        return `${this.getDataValue("height")} m`;
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      get() {
        return `${this.getDataValue("weight")} kg`;
      },
    },
    lifeYears: {
      type: DataTypes.INTEGER,
    },
  });
};
