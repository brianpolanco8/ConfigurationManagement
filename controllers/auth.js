const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed.");
    error.StatusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { email, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPassword,
      name: name,
    });
    await user.save();

    res.status(201).json({ message: "User created", userId: user._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log("error", error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.StatusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;

    const token = await jwt.sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    return;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};

exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ status: user.status });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const { status } = req.body;
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    user.status = status;
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Succesfully updated user", user: updatedUser });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//   let loadedUser;

//   User.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         const error = new Error("A user with this email could not be found.");
//         error.StatusCode = 401;
//         throw error;
//       }
//       loadedUser = user;
//       return bcrypt.compare(password, user.password);
//     })
//     .then((isEqual) => {
//       if (!isEqual) {
//         const error = new Error("Wrong password");
//         error.statusCode = 401;
//         throw error;
//       }

//       const token = jwt.sign(
//         {
//           email: loadedUser.email,
//           userId: loadedUser._id.toString(),
//         },
//         "somesupersecretsecret",
//         { expiresIn: "1h" }
//       );

//       res.status(200).json({ token: token, userId: loadedUser._id.toString() });
//     });
// };
