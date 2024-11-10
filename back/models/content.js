const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./../config/dbConfig");

const Content = sequelize.define(
  "Content",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4, // auto generate id
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    // stop auto-pluralization performed by Sequelize
    freezeTableName: true,
  },
);

module.exports = Content;
