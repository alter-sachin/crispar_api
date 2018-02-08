'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const Restaurant = db.models.Restaurant;


/*get model instance from db*/
function findRestaurantByID(id){
	return new Promise(function(resolve , reject ){
		Restaurant.findById(id).then(function(restaurant){
			if(!restaurant){
				return reject(new Error('No restaurant found for id'));
			}
			resolve(restaurant);
		}).catch(function(err){
			reject(err);
		});
	});
}

/*add new restaurant row*/
exports.addNew = function(restaurantObj) {
	return new Promise(function(resolve,reject){
		Restaurant.create(restaurantObj).then(function(restaurant){
			resolve(restaurant.get({
				plain : true
			}));
		}).catch(function(err){
			reject(err);
		});
	});
}


/*find by id*/
exports.getByID = function(id){
 
	return new Promise(function(resolve,reject){
		
		findRestaurantByID(id).then(function(restaurant){
			resolve(restaurant);
		}).catch(function(err){
			reject(err);	
		});
	});
}


/* delete by id */
exports.deleteByID = function(id){

	return new Promise(function(resolve,reject){

		findRestaurantByID(id).then(function(restaurant){

			return restaurant.destroy();

		}).then(function(restaurant){
			resolve(restaurant);
		}).catch(function(err){
			reject(err);	
		});
	});
}


exports.update = function(id , updateObj){

	return new Promise(function(resolve,reject){
		
		findRestaurantByID(id).then(function(restaurant){
			return restaurant.update(updateObj);
		}).then(function(restaurant){
			resolve(restaurant);
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
		Restaurant.findAll(query).then(function(restaurants){
			resolve(restaurants)
		}).catch(function(err){
			reject(err);
		});
	});
}