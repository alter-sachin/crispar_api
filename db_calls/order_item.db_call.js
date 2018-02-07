'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const OrderItem = db.models.OrderItem;
const uuidv4 = require('uuid/v4');




/*add new restaurant row*/
exports.addNew = function(orderItemObj) {
	orderItemObj.id = uuidv4();
	return new Promise(function(resolve,reject){
		OrderItem.create(orderItemObj).then(function(orderItem){
			resolve(orderItem);
		}).catch(function(err){
			reject(err);
		});
	});
}

