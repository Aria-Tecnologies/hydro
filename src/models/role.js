const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');
const RoleModel = sequelize.define('Role', {
  name: DataTypes.STRING,
});

const init = async () =>{
  await RoleModel.sync();
  return RoleModel
}

init()

module.exports = RoleModel