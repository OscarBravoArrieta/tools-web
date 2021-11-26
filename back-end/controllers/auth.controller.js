 //import User from '../models/users.model'
 
 import Employess from '../models_single/employees.model'
 const { QueryTypes } = require ( 'sequelize' )
 const db = require ('../models')
 //------------------------------------------------------------------------------------------------
 export const signUp = async (req, res) => {
     const {id_number, name, email, password, status, creation_date, reset_date_password, createdAt, updatedAt} = req.body 
          
     try {
         let newUser = await db.users.create({
             id_number, 
             name, 
             email, 
             password, 
             status,
             creation_date, 
             reset_date_password,
             createdAt,
             updatedAt},{
             fields:
             [   
                 'id_number', 
                 'name', 
                 'email', 
                 'password', 
                 'status',
                 'creation_date', 
                 'reset_date_password',
                 'createdAt',
                 'updatedAt'
             ]
         } )
         if (newUser){
            return res.json({
                 message: 'User created sucefully',
                 data: newUser
            })
        }           
         
     } catch (error) {
         console.log('Error->', error);
         res.status(500).json({
             message: 'Ha ocurrido un error. No se grabó el registro...' + error,
             data:{}
         })                  
     }


 }
 //------------------------------------------------------------------------------------------------
 export const signIn = async (req, res) => {
     //const {id_number, name, email, password, status, creation_date, reset_date_password} = req.body
     //console.log(req.body)     
 }
 //------------------------------------------------------------------------------------------------
 export async function getDataForUser(req, res) {
     const idEmployee = req.body.idEmployee
     const { fn, col } = Employess.sequelize
     try {
         const nameEmployee = await Employess.findAll({
             attributes: [ ['cedtra', 'IDENTIFICACION'],
                           [fn('CONCAT', col('priape'), ' ', col('segape'), ' ', col('prinom'), ' ',col('segnom')),"NOMBRE"], 
                           ['nit','NIT'],
                           ['estado', 'ESTADO'],
                           ['email', 'EMAIL']
                         ],
             where: {
                 cedtra: idEmployee
             }
         })
        if (nameEmployee){
            console.log('Nombre...', nameEmployee)
             res.json(nameEmployee)
        }         
     } catch (error) {
         console.log(error);
     }
 }
 //------------------------------------------------------------------------------------------------