 import Employees from '../models_single/employees.model'
 const db = require ('../models')

 export const userFound = async (req, res, next) => {
     try {
         const user = await db.users.findOne({
             where: {
                 id_number: req.body.id_number
             }
         }) 
         console.log(user)
         if (user) {
            
             return res.json({userFound: true, user: user, message: req.body.id_number + ', Ya se encuentra registrado.'})
         } 
         next()
         
     } catch (error) {
         console.log('Method -> userFound...', error)
         
     }

 }
 // -----------------------------------------------------------------------------------------------
 export const checkUserStatus = async (req, res, next) => {
     try {
         const statusEmployee = await Employees.findAll({
             attributes: [['estado','ESTADO']],
             where: {cedtra: req.body.id_number}
         })
         console.log('statusEmployee...', statusEmployee[0].dataValues.ESTADO) 
         if(statusEmployee[0].dataValues.ESTADO != 'A'){
             return res.json({
                 message: 'Acceso denegado. Usuario No se encuentra activo en SISU.',
                 data: null,
                 token: null
             })             
         }
         next()
         
     } catch (error) {
         console.log('Method -> checkUserStatus...', error)
         
     }
 }
 // -----------------------------------------------------------------------------------------------

 



