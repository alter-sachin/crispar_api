'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const Dish = db.models.Dish;


/*get model instance from db*/
function findDishByID(id){
	return new Promise(function(resolve , reject ){
		Dish.findById(id).then(function(dish){
			if(!dish){
				return reject(new Error('No dish found for id'));
			}
			resolve(dish);
		}).catch(function(err){
			reject(err);
		});
	});
}

/*add new dish row*/
exports.addNew = function(dishObj) {
	return new Promise(function(resolve,reject){
		Dish.create(dishObj).then(function(dish){
			resolve(dish);
		}).catch(function(err){
			reject(err);
		});
	});
}


/*find by id*/
exports.getByID = function(id){
 
	return new Promise(function(resolve,reject){
		
		findDishByID(id).then(function(dish){
			resolve(dish);
		}).catch(function(err){
			reject(err);	
		});
	});
}


/* delete by id */
exports.deleteByID = function(id){

	return new Promise(function(resolve,reject){

		findDishByID(id).then(function(dish){

			return dish.destroy();

		}).then(function(dish){
			resolve(dish);
		}).catch(function(err){
			reject(err);	
		});
	});
}


exports.update = function(id , updateObj){

	return new Promise(function(resolve,reject){
		
		findDishByID(id).then(function(dish){
			return dish.update(updateObj);
		}).then(function(dish){
			resolve(dish);
		}).catch(function(err){
			reject(err);	
		});
	});


}


exports.getList = function(){
	return new Promise(function(resolve,reject){
		Dish.all().then(function(dishs){
			resolve(dishs)
		}).catch(function(err){
			reject(err);
		});
	});
}