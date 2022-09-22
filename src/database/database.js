
require('dotenv').config();
const fs = require("fs");
const Sequelize = require("sequelize");
const modelUser = require("../models/user.js")
const modelCrop = require("../models/crop.js")
const modelRole = require("../models/role.js")

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const cert = [fs.readFileSync("aws_skysql_chain.pem", "utf8")]

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    logging: console.log,
    dialect: "mariadb",
    maxConcurrentQueries: 100,
    /**dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },*/
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
  }
)

modelUser(sequelize);
modelCrop(sequelize);
modelRole(sequelize);

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