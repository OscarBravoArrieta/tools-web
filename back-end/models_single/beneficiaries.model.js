 import Sequelize from 'sequelize'
 import { sequelize } from '../dbConnection/dbConnection'
 const Beneficiarios = sequelize.define('subsi22', {
     codben :{ type: Sequelize.INTEGER},
     documento :{ type: Sequelize.CHAR},
     coddoc :{ type: Sequelize.CHAR},
     fecexp :{ type: Sequelize.DATE},
     priape :{ type: Sequelize.CHAR},
     segape :{ type: Sequelize.CHAR},
     prinom :{ type: Sequelize.CHAR},
     segnom :{ type: Sequelize.CHAR},
     parent :{ type: Sequelize.ENUM('1','2','3')},
     huerfano :{ type: Sequelize.ENUM('0','1','2')},
     tiphij :{ type: Sequelize.ENUM('0','1','2')},
     captra :{ type: Sequelize.ENUM('N','I')},
     tipdis :{ type: Sequelize.CHAR},
     nivedu :{ type: Sequelize.CHAR},
     sexo :{ type: Sequelize.CHAR},
     fecnac :{ type: Sequelize.DATE},
     ciunac :{ type: Sequelize.CHAR},
     calendario :{ type: Sequelize.ENUM('N','A','B')},
     giro :{ type: Sequelize.ENUM('S','N')},
     codgir :{ type: Sequelize.CHAR},
     estado :{ type: Sequelize.ENUM('A','I','M')},
     codest :{ type: Sequelize.CHAR},
     fecest :{ type: Sequelize.DATE}    
 },{
     timestamps: false,
     freezeTableName: true
 },)
export default Beneficiarios