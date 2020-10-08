const models = require("../models");

async function createUser(req, res) {
  let newUser = null;
  let user = models.User.build({
    email: req.body.email,
    password: req.body.password,
  });

  user.save().then((_newUser) => (newUser = _newUser));
  res.json(JSON.stringify(newUser));
}

exports.createUser = createUser;
