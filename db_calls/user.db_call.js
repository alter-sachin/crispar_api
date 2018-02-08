'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const User = db.models.User;


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

/*add new user row*/
exports.addNew = function(userObj) {
	return new Promise(function(resolve,reject){
		User.create(userObj).then(function(user){
			resolve(user);
		}).catch(function(err){
			reject(err);
		});
	});
}


/*find by id*/
exports.getByID = function(id){
 
	return new Promise(function(resolve,reject){
		
		findUserByID(id).then(function(user){
			resolve(user);
		}).catch(function(err){
			reject(err);	
		});
	});
}


/* delete by id */
exports.deleteByID = function(id){

	return new Promise(function(resolve,reject){

		findUserByID(id).then(function(user){

			return user.destroy();

		}).then(function(user){
			resolve(user);
		}).catch(function(err){
			reject(err);	
		});
	});
}


exports.update = function(id , updateObj){

	return new Promise(function(resolve,reject){
		
		findUserByID(id).then(function(user){
			return user.update(updateObj);
		}).then(function(user){
			resolve(user);
		}).catch(function(err){
			reject(err);	
		});
	});
}


exports.getList = function(params){
	var query = {
		offset : params.start,
		limit : params.limit,
		order  : [
			[params.sortBy , params.order]
		]
	}
	return new Promise(function(resolve,reject){
		User.findAll(query).then(function(restaurants){
			resolve(restaurants)
		}).catch(function(err){
			reject(err);
		});
	});
}