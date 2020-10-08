const express = require("express");
const { updateRoutesInfo, usersController } = require("./controllers");

const router = express.Router();

router.get("/alive", (req, res) => res.sendStatus(200));

router.post("/update-routes-info", updateRoutesInfo);

router.post("/users", usersController.createUser);

module.exports = router;
