const models = require("../models");
const bcrypt = require("bcryptjs");
const passport = require("passport");

/*=== REGISTER ===*/
async function register(io, socket, userDetailt, callback) {
  console.log("userDetailt = ", userDetailt);

  const { name, email, password, passwordConfirm } = userDetailt;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !passwordConfirm)
    errors.push({ message: "Please fill in all fields" });

  // Check passwords match
  if (password !== passwordConfirm)
    errors.push({ message: "Passwords do not match" });

  // Check pass length
  if (password.length < 12)
    errors.push({ message: "Passwords should be at least 6 characters" });

  if (errors.length > 0) return callback({ errors });

  const foundUser = await models.User.findOne({ where: { email } });
  if (foundUser) {
    // User already exists
    errors.push({ message: "Email is already registered" });
    return callback({ errors });
  }

  const userInfo = { name, email, password };

  try {
    // Hash password
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(userInfo.password, salt, async (e, hash) => {
        if (e) throw e;
        userInfo.password = hash;

        const userBuild = await models.User.build(userInfo);
        const newUser = await userBuild.save();

        const userDto = {
          email: newUser.email,
          id: newUser.id,
          name: newUser.name,
          preferences: newUser.preferences,
          roles: newUser,
        };
        return callback({ user: userDto });
      })
    );
  } catch (error) {
    errors.push({ message: error });
    return callback({ errors });
  }
}

/*=== LOGIN ===*/
async function login(io, socket, userDetailt, callback) {
  console.log("userDetailt = ", userDetailt);
  // figure out how to do passport authenticate with websockets
  // if it is too complicated, then just do auth with http rest
  passport.authenticate("local");
  callback(userDetailt);
}

/*=== LOGOUT ===*/
async function logout(io, socket, userDetailt, callback) {
  console.log("userDetailt = ", userDetailt);
  callback(userDetailt);
}

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
exports.register = register;
exports.login = login;
exports.logout = logout;

// if (errors.length > 0) {
//   callback({ errors });
// } else {
//   const foundUser = await models.User.findOne({ where: { email } });
//   if (foundUser) {
//     // User already exists
//     errors.push({ message: "Email is already registered" });
//     callback({ errors });
//   } else {
//     //
//     const newUser = await models.User.build({
//       name,
//       email,
//       password,
//     });

//     // await user.save().then((_newUser) => (newUser = _newUser));
//     callback({ user: userDetailt });
//   }
// }
