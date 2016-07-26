'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('product', {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.BLOB
    },
    status: {
        type: Sequelize.ENUM('available', 'out of stock', 'discontinued'),
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    stock: {
        type: Sequelize.INTEGER,
        defaultValue: 3
    }
}, {
    instanceMethods: {
      removeStock: function(num) {
          this.stock -= num;
          if (this.stock < 1) this.setDataValue('status', 'out of stock');
      },
      addStock: function(num) {
          this.stock += num;
          if (this.getDataValue('status') !== 'available') this.setDataValue('status', 'available');
      }
    }
})