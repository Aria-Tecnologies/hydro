const db = require('../database/database');
const UserModel = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("private.pem");

exports.sigup = async (req, res) => {
  const { username, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(10);

  const existUser = await UserModel.findAll({
    where: {
      email,
    },
  });

  if (existUser.length > 0) return res.status(400).json({message: "An user alredy exists with this email"});

  const newUser = new UserModel({
    username,
    email,
    password: await bcrypt.hash(password, salt),
    role : role ? role : 'Guest'
  });

  await newUser.save();
  if (newUser.dataValues.email == email) {
    const token = jwt.sign({ id: newUser.dataValues.id }, privateKey, {
      expiresIn: 86400, // 24hrs 
    });
    return res.status(200).json({ message: "A new user has been added successfuly", token });
  } else {
    return res.status(500).json({ message: "An error has benn ocurred" });
  }
};

exports.singin = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findAll({
    where: {
      email
    },
  });
  if ( user.length > 0 && await bcrypt.compare(password, user[0].dataValues.password) ) {
    const token = jwt.sign({ id: user[0].dataValues.id }, privateKey, {
      expiresIn: 86400, // 24hrs
    });

    return res.status(200).json({ message: "Successfuly", token });
  } else {
    return res.status(400).json({ message: "Credentials doesn´t match" });
  }
};
