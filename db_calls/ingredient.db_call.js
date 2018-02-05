'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const Ingredient = db.models.Ingredient;
const uuidv4 = require('uuid/v4');




/*add new restaurant row*/
exports.addNew = function(ingredientObj) {
	ingredientObj.id = uuidv4();
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
				name : ingredientObj.name,
				description : ingredientObj.description
			}
		}).then(function(ingredientModel){
			resolve(ingredientModel);
		}).catch(function(err){
			reject(err);
		});
	});
}