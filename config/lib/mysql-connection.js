//const mysql = require('mysql2');
const config = require('../config');

const db = mysql.createPool({
	connectionLimit : config.db.connectionLimit,
	host : config.db.host,
	user :  config.db.user,
	password: config.db.password,
	database: config.db.dbName
});



function connectionCheck() {
	return new Promise((resolve,reject) => {
		db.getConnection(function(err, connection) {
			if(err) {
				connection.release();
				reject(err)
			} else  {
				resolve('success')
			}
		})
	})
}

function connectionRelease() {
	db.on('release', function (connection) {
		console.log('Connection %d released', connection.threadId);
	});
}


connectionCheck().then(function(){
	db.query('SHOW DATABASES' , function(err,results,fields){
		console.log(err);
		console.log(results);
		console.log(fields);
	});
});

module.exports = {
	db : db,
	utils:{
		connectionCheck:connectionCheck(),
		connectionRelease:connectionRelease()   
	}
}