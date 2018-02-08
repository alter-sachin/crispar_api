'use strict';
const uuidv4 = require('uuid/v4');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var restaurantDB = require('../db_calls/restaurant.db_call');
var dishDB = require('../db_calls/dish.db_call');
var processDB = require('../db_calls/process.db_call');
var flavourDB = require('../db_calls/flavour.db_call');
var ingredientDB = require('../db_calls/ingredient.db_call');



function addProcess(dishProcessObj,dishModel){
	return new Promise(function(resolve , reject){
		if(!dishProcessObj){
			return resolve();
		}
		if(dishProcessObj && !dishProcessObj.name){
			return reject(new Error('dish.process.name is missing'));
		}
		processDB.addNew(dishProcessObj).then(function(process){
			return process.setDish(dishModel);
		}).then(function(){
			resolve(process);
		}).catch(function(err){
			reject(err);
		});
		
	});
}


function addFlavour(flavourObj,dishModel){
	return new Promise(function(resolve , reject){
		if(!flavourObj){
			return resolve();
		}
		if(flavourObj && !flavourObj.name){
			return reject(new Error('dish.flavour.name is missing'));
		}
		flavourDB.addNew(flavourObj).then(function(flavour){
			return flavour.setDish(dishModel);
		}).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
		
	});
}


function addSingleIngredient(ingredient){
	return new Promise(function(resolve,reject){
		ingredientDB.search(ingredient).then(function(ingredientModel){
			if(ingredientModel){
				return resolve(ingredientModel);
			}else{
				return ingredientDB.addNew(ingredient);
			}
		}).then(function(ingredientModel){
			resolve(ingredientModel);
		}).catch(function(err){
			reject(err);
		});
	});
}



function addIngredients(ingredients , dishModel){
	return new Promise(function(resolve,reject){
		if(!ingredients){
			return resolve();
		}
		
		var promiseMap = ingredients.map(function(ingredient){
			return addSingleIngredient(ingredient);
		});

		Promise.all(promiseMap).then(function(ingredientModels){
			return dishModel.setIngredients(ingredientModels);
		}).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}


function findRestaurant(id){
	return new Promise(function(resolve , reject){
		if(!id){
			reject(new Error('restaurantId missing'));
		}else{
			restaurantDB.getByID(id).then(function(restaurant){
				resolve(restaurant);
			}).catch(function(err){
				reject(err);
			});
		}
	});
}

function checkIngredients(ingredients){
	var valFlag = true;
	_.each(ingredients , function(ingredient){
		if(!ingredient.name){
			valFlag = false;
		}
	});
	return valFlag;
}



function checkMainDishData(dishObj){
	var requiredFields = ['name','description','price','category','modelLocation'];
	var check = {
		notValid : false,
		missing : ''
	};
	_.each(requiredFields , function(field){
		if(!dishObj[field]){
			check.notValid = true;
			check.missing = check.missing + ' '+ field;
		}
	});

	return check
}

function validateDishData(dishObj){
	return new Promise(function(resolve , reject){
		var check = checkMainDishData(dishObj);
		if(check.notValid){
			reject(new Error('dish - '+check.missing+' - missing'));	
		}else if(dishObj.process && !dishObj.process.name ){
			reject(new Error('dish.process.name is missing'));
		}else if (dishObj.flavour && !dishObj.flavour.name){
			reject(new Error('dish.flavour.name is missing'));
		}else if(dishObj.ingredients && !_.isArray(dishObj.ingredients)){
			reject(new Error('dish.ingredients should be array'));
		}else if(dishObj.ingredients && !checkIngredients(dishObj.ingredients)){
			reject(new Error('dish.ingredient.name is missing'));
		}		
		else{
			resolve();
		}
	});
}

/* add new restaurant*/
exports.addNewDish = function(req , res) {
	
	var dishObj = {};
	dishObj.name  = req.body.name ;
	dishObj.category = req.body.category ;
	dishObj.description = req.body.description ;
	dishObj.price = req.body.price;
	dishObj.modelLocation = req.body.modelLocation;
	dishObj.id = uuidv4();


	var restaurantId = req.body.restaurantId;
	var restaurantModel , dishModel ;
	var processObj = req.body.process;
	var flavourObj = req.body.flavour;
	var ingredients = req.body.ingredients;



	findRestaurant(restaurantId).then(function(restaurant){
		restaurantModel = restaurant;
		return validateDishData(req.body);
	}).then(function(){
		return dishDB.addNew(dishObj);
	}).then(function(dish){
		dishModel = dish;
		return addProcess(processObj , dishModel);
	}).then(function(){
		return addFlavour(flavourObj , dishModel);
	}).then(function(){
		return addIngredients(ingredients , dishModel)
	}).then(function(flavour){
		res.json({
			status : 0,
			dish : dishModel
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	})
	
}


/*get dish data by id*/
exports.getDishByID = function(req,res){
	var id = req.params.dishID;

	dishDB.getByIDCompleteDetails(id).then(function(dish){
		res.json({
			status : 0,
			dish : dish
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}


/*delete dish by id*/
exports.deleteDish = function(req , res){
	var id = req.params.dishID;

	dishDB.deleteByID(id).then(function(dish){
		res.json({
			status : 0,
			message : 'dish deleted successfully',
			dish : dish
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
	
}


exports.getDishList = function(req , res){
	var params = {
		start : req.query.start ? _.toNumber(req.query.start) : 0,
		limit : req.query.limit ? _.toNumber(req.query.limit) : 250,
		sortBy : req.query.sortBy ? req.query.sortBy : 'createdAt',
		order : req.query.order ? req.query.order : 'DESC'
	};

	dishDB.getList(params).then(function(dish){
		
		res.json({
			status : 0,
			dish : dish
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}



function validateUpdatedDishData(dishObj){
	return new Promise(function(resolve , reject){
		if(dishObj.process && !dishObj.process.name ){
			reject(new Error('dish.process.name is missing'));
		}else if (dishObj.flavour && !dishObj.flavour.name){
			reject(new Error('dish.flavour.name is missing'));
		}else if(dishObj.ingredients && !_.isArray(dishObj.ingredients)){
			reject(new Error('dish.ingredients should be array'));
		}else if(dishObj.ingredients && !checkIngredients(dishObj.ingredients)){
			reject(new Error('dish.ingredient.name is missing'));
		}		
		else{
			resolve();
		}
	});
}


function updateProcess(dishModel , processObj){
	return new Promise(function(resolve,reject){
		if(!processObj){
			return resolve();
		}
		dishModel.getProcesses().then(function(processModels){
			if(!processModels[0]){
				return Promise.resolve();
			}
			return processModels[0].destroy();
		}).then(function(){
			return addProcess(processObj,dishModel);
		}).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}


function updateFlavour(dishModel , flavourObj){
	return new Promise(function(resolve,reject){
		if(!flavourObj){
			return resolve();
		}
		dishModel.getFlavours().then(function(flavourModels){
			if(!flavourModels[0]){
				return Promise.resolve();
			}
			return flavourModels[0].destroy();
		}).then(function(){
			return addFlavour(flavourObj,dishModel);
		}).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}


function deleteAllIngredients(ingredientModels){
	return new Promise(function(resolve,reject){
		var promiseMap = ingredientModels.map(function(ingredientModel){
			return ingredientModel.destroy();
		});

		Promise.all(promiseMap).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}

function updateIngredients(dishModel , ingredients){

	return new Promise(function(resolve,reject){
		if(!ingredients){
			return resolve();
		}
		dishModel.getIngredients().then(function(ingredientModels){
			return deleteAllIngredients(ingredientModels);
		}).then(function(){
			return addIngredients(ingredients,dishModel);
		}).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}

/*update restaurant*/
exports.updateDish = function(req , res){
	var id = req.params.dishID;
	var updateObj = {};
	req.body.name ? ( updateObj.name  = req.body.name ): '';
	req.body.category ? ( updateObj.category  = req.body.category ): '';
	req.body.description ? ( updateObj.description  = req.body.description ): '';
	req.body.price ?( updateObj.price = req.body.price ): '';
	req.body.modelLocation ?( updateObj.modelLocation = req.body.modelLocation ): '';

	var dishModel;

	validateUpdatedDishData(req.body).then(function(){
		return dishDB.getByID(id);
	}).then(function(dish){
		dishModel = dish;
		return updateProcess(dish , req.body.process);
	}).then(function(){
		return updateFlavour(dishModel , req.body.flavour);
	}).then(function(){
		return updateIngredients(dishModel , req.body.ingredients)
	}).then(function(){
		return dishModel.update(updateObj);
	}).then(function(){
		return dishDB.getByIDCompleteDetails(id);
	}).then(function(dish){
		res.json({
			status : 0,
			message : 'Dish updated successfully',
			dish : dish
		});
	}).catch(function(err){
		console.log(err.stack);
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}



/*search*/
exports.dishSearch = function(req , res){
	var searchObj =  {
		search : req.query.search ? req.query.search+"%" : '%%',
		field : req.query.field ? req.query.field : 'name'
	}

	dishDB.search(searchObj).then(function(dishes){
		res.json({
			status : 0,
			dishes : dishes
		});
	}).catch(function(err){
		console.log(err.stack);
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});

}