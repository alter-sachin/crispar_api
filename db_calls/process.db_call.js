'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const Process = db.models.Process;
const uuidv4 = require('uuid/v4');




/*add new restaurant row*/
exports.addNew = function(processObj) {
	processObj.id = uuidv4();
	return new Promise(function(resolve,reject){
		Process.create(processObj).then(function(process){
			resolve(process);
		}).catch(function(err){
			reject(err);
		});
	});
}

