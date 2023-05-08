'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Warehouse.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,    
  }, {
    sequelize,
    modelName: 'Warehouse',
  });

  
  Warehouse.associate = function (models) {
    //association can be defined here
    Warehouse.hasMany(models.Product, {
      foreignKey: 'warehouseId'
    })

    Warehouse.hasOne(models.User, {
      foreignKey: 'warehouseId'
    })
  }
  return Warehouse;
};