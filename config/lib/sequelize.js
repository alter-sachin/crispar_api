const Sequelize = require('sequelize');
const config = require('../config');



const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
	host: config.db.dbHost,
	dialect: 'mysql',

	logging:true,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
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



module.exports = {
	sequelize : sequelize,
	utils:{
		connectionCheck : connectionCheck
	}
}




