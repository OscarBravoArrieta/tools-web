import Sequelize from 'sequelize'
import { sequelize } from '../dbConnection/dbConnection'

const ReasonForInactivation = sequelize.define('subsi36', {
    codest: {
        type: Sequelize.STRING
    },
    detalle: {
       type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
},)

export default ReasonForInactivation