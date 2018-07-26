'use strict';

module.exports = function(sequelize , DataTypes){

	const Table = sequelize.define('table', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		},
		table_number : {
			type: DataTypes.FLOAT,
			allowNull : false
		},
		status : {
			type : DataTypes.ENUM,
			defaultValue  :"free",
			values: ['occupied', 'free']
		}

	});

	Table.associate = function(models){
		Table.hasMany(models.Order);
		Table.hasOne(models.Group);
	}

	return Table;
}