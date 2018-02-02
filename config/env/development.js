module.exports = {
	db:{
		connectionLimit : 10,
		host : process.env.dbHost || 'localhost',
		user : process.env.dbUser || 'root',
		password: process.env.dbPassword || 'adminpass',
		database: process.env.dbName || 'crispArDev'
	}
}