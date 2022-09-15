const { Sequelize, DataTypes } = require('sequelize');
const CropModel = require('../models/crop')
const RoleModel = require('../models/role')

const sequelize = new Sequelize('sqlite::memory:');
const UserModel = sequelize.define('User', {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
});

const init = async () =>{
  UserModel.belongsToMany(CropModel, { through: 'UserCrops'})
  UserModel.belongsToMany(RoleModel, { through: 'UserRoles' })
  await UserModel.sync();
  return UserModel
}

init()

module.exports = UserModel