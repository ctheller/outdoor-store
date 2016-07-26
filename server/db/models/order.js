'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
	status: {
		type: Sequelize.ENUM('cart', 'ordered', 'shipped', 'delivered'),
		defaultValue: 'cart'
	}
});