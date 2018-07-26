'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const Group = db.models.Group;


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
		Group.create(userObj).then(function(user){
			resolve(user);
		}).catch(function(err){
			reject(err);
		});
	});
}