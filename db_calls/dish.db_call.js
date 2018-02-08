'use strict';
const db = require('../config/lib/sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = db.sequelize;
const Dish = db.models.Dish;
const Process = db.models.Process;
const Ingredient = db.models.Ingredient;
const Flavour = db.models.Flavour;


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


/*find by id*/
exports.getByIDCompleteDetails = function(id){
 
	return new Promise(function(resolve,reject){
		
		Dish.findById(id,{
			include : [Process , Ingredient , Flavour]
		}).then(function(dish){
			if(!dish){
				return reject(new Error('No dish found for id'));
			}
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


exports.getList = function(params){
	var query = {
		offset : params.start,
		limit : params.limit,
		order  : [
			[params.sortBy , params.order]
		],
		include : [Process,Flavour,Ingredient]
	}
	return new Promise(function(resolve,reject){
		Dish.findAll(query).then(function(dishes){
			resolve(dishes)
		}).catch(function(err){
			reject(err);
		});
	});
}


exports.search = function(searchObj,params){
	var query = {
		offset : params.start,
		limit : params.limit,
		order  : [
			[params.sortBy , params.order]
		],
		where : {
			[searchObj.field] : {
				[Op.like] : searchObj.search
			}
		}
	}

	return new Promise(function(resolve,reject){
		Dish.findAll(query).then(function(dishes){
			resolve(dishes);
		}).catch(function(err){
			reject(err);
		});
	});
}