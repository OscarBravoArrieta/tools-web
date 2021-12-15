 import Employess from '../models_single/employees.model'
 const { QueryTypes } = require ( 'sequelize' )
 import bcrypt from 'bcryptjs'
 import jwt from 'jsonwebtoken'
 import config from '../config'
 const db = require ('../models')
 const randomstring = require("randomstring");
 const nodemailer = require("nodemailer");
 //-------------------------------------------------------------------------------------------------
 export const signUp = async (req, res) => {
     const {id_number, name, email, password, status, creation_date, token, reset_date_password, createdAt, updatedAt} = req.body
     const salt = await bcrypt.genSalt(10)
     const encryptedPassword = await bcrypt.hash(password, salt)
     try {
         let newUser = await db.users.create({
             id_number, 
             name, 
             email, 
             password: encryptedPassword, 
             status,
             creation_date,
             token,
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
                 'token',
                 'reset_date_password',
                 'createdAt',
                 'updatedAt'
             ]
         } )
         if (newUser){
             const token = jwt.sign({id: newUser.id}, config.SECRET, {
                 expiresIn: 7200 // Two Hours
             })

             const transporter = nodemailer.createTransport({
                 service: 'Gmail',
                 auth: {
                     user: 'comfa.edusoft@comfamiliar.org.co',
                     pass: 'Edusoft2021***'
                }
              })
              
              transporter.sendMail({
                  from: 'comfa.edusoft@comfamiliar.org.co',
                  to: newUser.email,
                  subject: 'Por favor confirme su cuenta',
                  html: `<h1>Confirmación de cuenta.</h1>
                  <h2>Hola, ${name}</h2>
                  <p>Gracias por suscribirte. Confirma tu cuenta haciendo clic en el siguiente enlace</p>
                  <a href=http://localhost:4200/verify-token-from-email/${token}> Confirmar cuenta</a>
                  <br>
                  </div>`,
              }).catch(err => console.log('Error al enviar email', err));             

             return res.json({
                 message: 'User created succefully',
                 data: newUser,
                 token: token
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
 export const verifyTokenFromEmail = async (req, res) => {
     //This method uses the authjwt.verifyTokenFromEmail from middlewares
 }
 //------------------------------------------------------------------------------------------------
 export const signIn = async (req, res) => {

     //console.log(randomstring.generate({length: 6, charset: 'url-safe'}))
     //return
    
     try {
         const userToLog = await db.users.findOne({
             where: {
                 id_number: req.body.id_number
             }
         })
         if (userToLog){

             if (!userToLog.status){ //If user.status is inactive   
                 return res.json({
                     message: 'Acceso denegado. Usuario está inactivo',
                     data: null,
                     token: null
                 })
             }
             const matchPassword = await bcrypt.compare(req.body.password, userToLog.password)
             if (matchPassword) {
                 const token = jwt.sign({id: userToLog.id}, config.SECRET, {
                     expiresIn: 7200 // Two Hours
                 })

                 return res.json({
                     message: 'Access granted',
                     data: userToLog,
                     token: token
                 })
             } else {
                 return res.json({
                     message: 'Error en el password',
                     data: null,
                     token: null
                 }) 
             }
         }
         else {
             res.json({
                 message: 'No se encontraron coincidencias con: ' + req.body.id_number,
                 data: null,
                 token: null})
         }
     } catch (error) {
         console.log(error);
         res.status(500).json({
             msgErrorLogin: 'Ha ocurrido un error al obtener el registro del usuario...' + error,
             data:{}
         })                  
     }
 }
 //------------------------------------------------------------------------------------------------
 export async function getDataForUser(req, res) {
     const id_number = req.body.id_number
     const { fn, col } = Employess.sequelize
     try {
         const nameEmployee = await Employess.findAll({
             attributes: [ ['cedtra', 'IDENTIFICACION'],
                           [fn('CONCAT',
                                 fn('COALESCE',col('prinom'),''),
                                 ' ',
                                 fn('COALESCE',col('segnom'),''), 
                                 ' ',
                                 fn('COALESCE',col('priape'),''),
                                 ' ',
                                 fn('COALESCE',col('segape'),'')),"NOMBRE"],
                           ['nit','NIT'],
                           ['estado', 'ESTADO'],
                           ['email', 'EMAIL']
                         ],
             where: {
                 cedtra: id_number
             }
         })
        if (nameEmployee){
             res.json(nameEmployee)
        }         
     } catch (error) {
         console.log(error);
     }
 }
 //------------------------------------------------------------------------------------------------