const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./../config/dbConfig");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // auto generate id
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
    // stop auto-pluralization performed by Sequelize
    // example: User model will create Users table automatically by Sequelize
    freezeTableName: true,
    // providing table name directly
    // tableName: 'User'
  },
);

// Model.prototype.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// User.addHook("beforeCreate", async (user) => {
//   const encryptedPassword = await bcrypt.hash(user.password, process.env.SALT);
//   user.password = encryptedPassword;
// });

module.exports = User;
