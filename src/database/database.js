
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
    ssl: true,
    extra: {
      trustServerCertificate: true,
      Encrypt: true,
      IntegratedSecurity: false,
  },
    /**dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },*/
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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  ...sequelize.models, 
  conn: sequelize,    
};