require("dotenv").config();
const fs = require("fs");

const Sequelize = require("sequelize");
const modelUser = require("../models/user.js")
const modelCrop = require("../models/crop.js")
const modelRole = require("../models/role.js")
const modelFarmer = require("../models/farmer.js")

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } =
  process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  dialectOptions: {
    ssl: {
      ca: [fs.readFileSync("aws_skysql_chain.cer", "utf-8")],
    },
    connectTimeout: 3000
  },
  define: {
    timestamps: false,
  },
});

modelUser(sequelize);
modelCrop(sequelize);
modelRole(sequelize);
modelFarmer(sequelize);

const {  User, Crop, Role, Farmer } = sequelize.models;
User.hasMany(Crop);
Crop.belongsTo(User);

User.hasMany(Role);
Role.belongsTo(User);

User.hasOne(Farmer)

const test = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync({
      forece: true
    })
    .then(() => console.log('models synchronized'))
    .catch(err => console.log(`An error has been ocurred: ${err}`))
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}

module.exports = {
  ...sequelize.models, 
  conn: sequelize,
  test    
};
