const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');
const CropModel = sequelize.define('Crop', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  status: DataTypes.STRING
});

const init = async () =>{
  await CropModel.sync();
  return CropModel
}

init()

module.exports = CropModel