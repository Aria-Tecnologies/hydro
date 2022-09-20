const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Crop', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    }
  }, {timeStamps: false,
    createdAt: false,
    updatedAt: false});
};