const { Sequelize } = require("sequelize");

const database = process.env.SQL_DATABASE;
const username = process.env.SQL_USERNAME || "sa";
const password = process.env.SQL_PASSWORD;
const server = process.env.SQL_SERVER || "localhost";

// sequelize refers to an instance of Sequelize, which represents a connection
// to one database
const sequelize = new Sequelize(database, username, password, {
  host: server,
  dialect: "mssql",
  // logging: (...msg) => console.log(msg),
  logging: console.log,
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();

    // sync tables in db, can be destructive and should not be used in production
    // both alter and force, we should use something to migrate gracefully
    // await sequelize.sync({ alter: true });
    await sequelize.sync({ force: true });

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // close connection, return promise
  // once the `close()` method has been called it's impossible to open new
  // connection you have to create a new instance of Sequelize
  // await sequelize.close();
};

module.exports = { sequelize, connectDatabase };
