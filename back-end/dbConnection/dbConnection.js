 import Sequelize from 'sequelize'

  export const sequelize = new Sequelize(
     'empresa', 
     'soportesys', 
     'soporte123.', 
     { 
         host: '190.109.7.108',
         dialect: 'mysql',
         pool: {
             max: 5,
             min: 0,
             idle: 10000
         },    
 });