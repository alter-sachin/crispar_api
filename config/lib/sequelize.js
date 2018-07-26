const Sequelize = require('sequelize');
const config = require('../config');
const path = require('path');
const _ = require('lodash');


const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
	host: config.db.dbHost,
	dialect: 'mysql',

	logging:true,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	define: {
    	underscored: false
	}

});



function connectionCheck() {
	return Promise(function(resolve,reject){
		sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.');
			resolve();
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
			reject(err);
		});
	});
}

/*call assoiciate function of models */
function initAssoiciateFunctions(models){
	_.each(models , function(model){
		if(model.associate){
			model.associate(models);
		}
	})
}


/*init all the models*/
function initModels(){
	
	var models = {};
	models.Dish = sequelize.import(path.join(__dirname,'../../models/dish.model'));
	models.Ingredient = sequelize.import(path.join(__dirname,'/../../models/ingredient.model'));
	models.Order = sequelize.import(path.join(__dirname,'../../models/order.model'));
	models.OrderItem = sequelize.import(path.join(__dirname,'../../models/orderItem.model'));
	models.Restaurant = sequelize.import(path.join(__dirname,'../../models/restaurant.model'));
	models.User = sequelize.import(path.join(__dirname,'../../models/user.model'));
	models.Flavour = sequelize.import(path.join(__dirname,'../../models/flavour.model'));
	models.Process = sequelize.import(path.join(__dirname,'../../models/process.model'));
	models.Table = sequelize.import(path.join(__dirname,'../../models/table.model'));
	models.Group = sequelize.import(path.join(__dirname,'../../models/group.model'));

	initAssoiciateFunctions(models);
	return models;


}



module.exports = {
	sequelize : sequelize,
	utils:{
		connectionCheck : connectionCheck
	},
	models : initModels()
}




