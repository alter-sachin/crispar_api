'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const Table = db.models.Table;


/*get model instance from db*/
function findUserByID(id){
	return new Promise(function(resolve , reject ){
		User.findById(id).then(function(user){
			if(!user){
				return reject(new Error('No user found for id'));
			}
			resolve(user);
		}).catch(function(err){
			reject(err);
		});
	});
}

/*add new table row*/
exports.addNew = function(userObj) {
	return new Promise(function(resolve,reject){
		Table.create(userObj).then(function(user){
			resolve(user);
		}).catch(function(err){
			reject(err);
		});
	});
}

exports.findByTableNumber = function(tableNumber,id) {
	return new Promise(function(resolve,reject){
		Table.findOne({ where: {table_number: tableNumber,restaurantId:id}}).then(function(table){
			resolve(table);
		}).catch(function(err){
			reject(err);
		});
	});
}