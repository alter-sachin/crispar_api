'use strict';
const db = require('../config/lib/sequelize');
const _ = require('lodash');
const sequelize = db.sequelize;
const Ingredient = db.models.Ingredient;
const uuidv4 = require('uuid/v4');


function makeLowercase(ingredientObj){
	_.each(ingredientObj , function(value , key){
		ingredientObj[key] = value.toLowerCase();
	});
}

/*add new restaurant row*/
exports.addNew = function(ingredientObj) {
	ingredientObj.id = uuidv4();
	makeLowercase(ingredientObj);
	
	return new Promise(function(resolve,reject){
		Ingredient.create(ingredientObj).then(function(ingredient){
			resolve(ingredient);
		}).catch(function(err){
			reject(err);
		});
	});
}

/* serach by name and description*/
exports.search = function(ingredientObj){
	return new Promise(function(resolve,reject){
		Ingredient.findOne({
			where : {
				name : ingredientObj.name.toLowerCase(),
				description : ingredientObj.description ? ingredientObj.description.toLowerCase() : undefined 
			}
		}).then(function(ingredientModel){
			resolve(ingredientModel);
		}).catch(function(err){
			reject(err);
		});
	});
}