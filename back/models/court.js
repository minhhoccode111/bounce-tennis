const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./../config/dbConfig");
const User = require("./user");

const Court = sequelize.define(
  "Court",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4, // auto generate id
      primaryKey: true,
      allowNull: false,
    },
    timeBooked: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courtBooked: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayBooked: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // foreign key
    userBooked: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    yearBooked: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monthBooked: {
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

// Setting up the association
Court.belongsTo(User, { foreignKey: "userBooked" });

module.exports = Court;
