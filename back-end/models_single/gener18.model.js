 import Sequelize from 'sequelize'
 import { sequelize } from '../dbConnection/dbConnection'

 const Gener18 = sequelize.define('gener18', {
     coddoc: {
         type: Sequelize.STRING
     },
     detdoc: {
        type: Sequelize.STRING
     },
     codrua: {
         type: Sequelize.STRING
     }
 },{
     timestamps: false,
     freezeTableName: true
 },)

 export default Gener18