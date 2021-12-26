 module.exports = (sequelize, DataTypes) => {
     const Users = sequelize.define('users', {       
         id_number: DataTypes.STRING,
         name: DataTypes.STRING,
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         status: DataTypes.BOOLEAN,
         creation_date: DataTypes.DATEONLY,
         reset_date_password: DataTypes.DATEONLY
         },{}) 
         
         Users.associate = function(models) {
             Users.hasMany(models.users_roles, {
                 foreignKey: 'fk_id_user',
                 onDelete: 'RESTRICTED'
             })           
         } 
     return Users
 }
 