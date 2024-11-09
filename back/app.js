var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// const mongoose = require("mongoose");

var app = express();
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var corsOptions = {
  origin: [
    "https://finalproject-yscx.onrender.com",
    "http://localhost:3000",
    "https://bounce-rouge.vercel.app",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", indexRouter);
app.use("/users", usersRouter);

const Connection = require("tedious").Connection;
const Request = require("tedious").Request;

const config = {
  server: process.env.SQL_SERVER,
  options: {
    encrypt: false, // true if Azure
    database: process.env.SQL_DATABASE,
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
    },
  },
};

const connection = new Connection(config);

connection.on("connect", (err) => {
  if (err) console.error(err);

  //   // execute test command
  //   executeStatement(
  //     `
  // INSERT INTO Users (id, name, username, password, is_deleted, role, created_at, updated_at) VALUES
  // ('1', 'Alice Johnson', 'alicej', 'password123', 0, 'user', GETDATE(), GETDATE()),
  // ('2', 'Bob Smith', 'bobsmith', 'pass456', 0, 'admin', GETDATE(), GETDATE()),
  // ('3', 'Charlie Brown', 'charlieb', 'charlie789', 0, 'user', GETDATE(), GETDATE()),
  // ('4', 'Diana Prince', 'dianap', 'wonderwoman', 0, 'user', GETDATE(), GETDATE()),
  // ('5', 'Evan Davis', 'evand', 'strongpassword', 1, 'user', GETDATE(), GETDATE())
  // `,
  //   )

  executeStatement()
    .then((rows) => console.log("Test query result: ", rows))
    .catch((err) => console.error("Error occur: ", err));
});

function executeStatement(command = `select 42, 'hello, world'`) {
  return new Promise((resolve, _) => {
    // array to store formatted rows
    const rows = [];
    const request = new Request(command, (err, rowCount) => {
      if (err) throw err;

      console.log(`${rowCount} rows`);
      resolve(rows); // return out of promise
      connection.close();
    });

    request.on("row", (columns) => {
      const row = {};
      columns.forEach((col) => {
        row[col.metadata.colName] = col.value;
      });
      rows.push(row);
    });

    connection.execSql(request);
    return rows;
  });
}

// connect to database
connection.connect();

module.exports = app;
