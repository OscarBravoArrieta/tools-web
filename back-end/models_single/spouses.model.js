 import Sequelize from 'sequelize'
 import { sequelize } from '../dbConnection/dbConnection'
 const Spouses = sequelize.define('subsi20', {
     cedcon :{ type: Sequelize.CHAR},
     coddoc :{ type: Sequelize.CHAR},
     priape :{ type: Sequelize.CHAR},
     segape :{ type: Sequelize.CHAR},
     prinom :{ type: Sequelize.CHAR},
     segnom :{ type: Sequelize.CHAR},
     direccion :{ type: Sequelize.CHAR},
     codciu :{ type: Sequelize.CHAR},
     telefono :{ type: Sequelize.CHAR},
     email :{ type: Sequelize.CHAR},
     codzon :{ type: Sequelize.CHAR},
     codcaj :{ type: Sequelize.CHAR},
     codocu :{ type: Sequelize.CHAR},
     captra :{ type: Sequelize.ENUM('N','I')},
     nivedu :{ type: Sequelize.CHAR},
     salario :{ type: Sequelize.CHAR},
     fecsal :{ type: Sequelize.CHAR},
     tippag :{ type: Sequelize.ENUM('B','C','G','E','T','N')},
     codcue :{ type: Sequelize.CHAR},
     ofides :{ type: Sequelize.CHAR},
     codgru :{ type: Sequelize.CHAR},
     codban :{ type: Sequelize.CHAR},
     numcue :{ type: Sequelize.CHAR},
     tipcue :{ type: Sequelize.CHAR},
     sexo :{ type: Sequelize.CHAR},
     estciv :{ type: Sequelize.CHAR},
     fecnac :{ type: Sequelize.CHAR},
     ciunac :{ type: Sequelize.CHAR},
     estado :{ type: Sequelize.ENUM('A','I','M')},
     fecest :{ type: Sequelize.DATE},    
 },{
     timestamps: false,
     freezeTableName: true
},)

 export default Spouses