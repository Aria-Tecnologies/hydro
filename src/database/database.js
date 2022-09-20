
require('dotenv').config();

const Sequelize = require("sequelize");
const modelUser = require("../models/user.js")
const modelCrop = require("../models/crop.js")
const modelRole = require("../models/role.js")

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`mariadb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemons`, {
  logging: false,
  native: false,
  dialect: "mariadb",
});

modelUser(sequelize);
modelCrop(sequelize);
modelRole(sequelize);
/**
 *   UserModel.belongsToMany(CropModel, { through: 'UserCrops'})
  UserModel.belongsToMany(RoleModel, { through: 'UserRoles' })
 */
const {  User, Crop, Role } = sequelize.models;
User.hasMany(Crop);
Crop.belongsTo(User);

User.hasMany(Role);
Role.belongsTo(User);
exports.test = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}

module.exports = {
  ...sequelize.models, 
  conn: sequelize,    
};