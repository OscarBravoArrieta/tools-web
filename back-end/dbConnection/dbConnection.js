 import Sequelize from 'sequelize'

  export const sequelize = new Sequelize(
     'empresa', 
     'soportesys', 
     'soporte123.', 
     { 
         host: '192.168.21.21',
         dialect: 'mysql',
         pool: {
             max: 5,
             min: 0,
             idle: 10000
         },    
 });

 // host: '192.168.21.15', => poduction