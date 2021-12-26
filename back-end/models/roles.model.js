 module.exports = (sequelize, DataTypes) => {
     const Roles = sequelize.define('roles', {
         rol_name: DataTypes.STRING,
         description: DataTypes.STRING
     },{});  
     return Roles;
 }