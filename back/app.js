var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

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

const { connectDatabase } = require("./config/dbConfig");

connectDatabase();

module.exports = app;
