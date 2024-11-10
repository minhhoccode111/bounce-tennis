const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./../config/dbConfig");

class Content extends Model {}

Content.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Content",
    timestamps: true,
  },
);

module.exports = Content;
