const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Role', {
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
    isActive:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate:{
        notNull: true
      },
      defaultValue: false
    }
  }, {timeStamps: false,
    createdAt: false,
    updatedAt: false});
};
