module.exports = {
	db:{
		host : process.env.dbHost || 'localhost',
		user : process.env.dbUser || 'root',
		password: process.env.dbPassword || '',
		database: process.env.dbName || 'crispARprod'
	},
	port: process.env.PORT || 8443,
	host: process.env.HOST || '0.0.0.0'
}
