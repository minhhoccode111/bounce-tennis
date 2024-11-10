const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./../config/dbConfig");
const User = require("./User");

class Court extends Model {}

Court.init(
  {
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
    userBooked: {
      type: DataTypes.INTEGER, // Foreign key referencing User model
      allowNull: false,
      references: {
        model: User, // Reference the User model
        key: "id", // Assuming 'id' is the primary key of User
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
    sequelize,
    modelName: "Court",
    timestamps: true,
  },
);

// Setting up the association
Court.belongsTo(User, { foreignKey: "userBooked" });

console.log(Court === sequelize.models.Court); // true

module.exports = Court;
