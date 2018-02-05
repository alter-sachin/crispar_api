'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const Flavour = db.models.Flavour;
const uuidv4 = require('uuid/v4');




/*add new restaurant row*/
exports.addNew = function(flavourObj) {
	flavourObj.id = uuidv4();
	return new Promise(function(resolve,reject){
		Flavour.create(flavourObj).then(function(flavour){
			resolve(flavour);
		}).catch(function(err){
			reject(err);
		});
	});
}

