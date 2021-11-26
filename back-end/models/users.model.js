 const bcrypt = require('bcryptjs');
 module.exports = (sequelize, DataTypes) => {
     const Users = sequelize.define('users', {       
         id_number: DataTypes.STRING,
         name: DataTypes.STRING,
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         status: DataTypes.BOOLEAN,
         creation_date: DataTypes.DATEONLY,
         reset_date_password: DataTypes.DATEONLY
         },{}, 
             {hooks: {
                 beforeCreate: async (Users) => {
                     console.log('Hoooooooooook')
                     if (Users.password) {
                         const salt = await bcrypt.genSaltSync(10, 'a');
                         User.password = bcrypt.hashSync(Users.password, salt);
                    }
                 }
             }  
         })   
     return Users
}
 