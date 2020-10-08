const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cron = require("node-cron");
const handleCronjob = require("./utils/cronJob");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Run cron job every 4th Tuesday (once a month)
cron.schedule("30 7 * * Tue", handleCronjob, { scheduled: true });

app.use("/api", routes);

module.exports = app;
