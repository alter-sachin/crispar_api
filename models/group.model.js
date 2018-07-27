'use strict';

module.exports = function(sequelize , DataTypes){

	const Group = sequelize.define('group', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		},
		token:{
			type: DataTypes.STRING,
			allowNull : true
		}
		
		

	});

	Group.associate = function(models){
		//Group.belongsTo(models.Table);
	}

	return Group;
}