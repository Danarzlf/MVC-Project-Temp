'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init({
    city: DataTypes.STRING,
    address: DataTypes.TEXT,
    images: DataTypes.ARRAY(DataTypes.TEXT),
    // ['shifly.jpg', 'arfin.png']
    role: {
      type: DataTypes.ENUM(['Admin', 'User', 'Super Admin']),
      defaultValue: 'User'
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};