const UserModel = require("../models/user");
const response = require("../helpers/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("private.pem");

exports.sigup = async (req) => {
  const salt = await bcrypt.genSalt(10);

  const newUser = await UserModel.create({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
  });

  await newUser.save();
  if (newUser.dataValues.email == req.body.email) {
    const token = jwt.sign({ id: newUser.dataValues.id }, privateKey, {
      expiresIn: 86400, // 24hrs
    });
    return response(200, "A new user has been added successfuly", token);
  } else {
    return response(204, "An error has benn ocurred");
  }
};

exports.singin = async (req) => {
  const user = await UserModel.findAll({
    where: {
      email: req.body.email,
    },
  });

  if (user.length > 0 && await bcrypt.compare(req.body.password, user[0].dataValues.password)) {
    const token = jwt.sign({ id: user[0].dataValues.id }, privateKey, {
      expiresIn: 86400 // 24hrs
    })

    return response(200, "Successfuly", token);
  } else {
    return response(204, "Credenciales incorrectas");
  }
};
