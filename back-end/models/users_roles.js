 module.exports = (sequelize, DataTypes) => {
     const Users_roles = sequelize.define('users_roles', {       
         fk_id_user: DataTypes.NUMBER,
         fk_id_rol: DataTypes.NUMBER
         }, {})

         Users_roles.associate = function(models) {
             Users_roles.belongsTo(models.users, {
                 foreignKey: 'fk_id_user',
                 onDelete: 'RESTRICTED'
             })
             Users_roles.belongsTo(models.roles, {
                foreignKey: 'fk_id_rol',
                onDelete: 'RESTRICTED'
            })             

             
         }    
         
     return Users_roles
 }