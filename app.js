const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cron = require("node-cron");
const session = require("express-session");
const passport = require("passport");
const handleCronjob = require("./utils/cronJob");
require("dotenv").config();

const app = express();

// Passport config
require("./config/passport")(passport);

// // Global variables
// app.use((req, res, next) => {
//   res.locals.some_variable_1 = "Hello!";
//   res.locals.some_variable_2 = "Bye!";
//   next();
// });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Run cron job every 4th Tuesday (once a month)
cron.schedule("30 7 * * Tue", handleCronjob, { scheduled: true });

app.use("/api", routes);

module.exports = app;
