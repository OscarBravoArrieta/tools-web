 import Employees from '../models_single/employees.model'
 const { QueryTypes, DATE } = require ( 'sequelize' )
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

             const fk_id_user = newUser.id
             const fk_id_rol = 5

             let newUserProfile = await db.users_roles.create({
                 fk_id_user,
                 fk_id_rol,createdAt,
                 updatedAt},{ 
                 fields:
                 [
                     'fk_id_user',
                     'fk_id_rol',
                     'createdAt',
                     'updatedAt'
                 ]
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
                  html: 
                     `<div>
                         <h1>Activación de cuenta.</h1>
                         <h2>Hola, ${name}</h2>
                         <p>Gracias por registrarse. Se le ha asignado un perfil de <strong>CONSULTOR BÁSICO</strong>. Si lo requiere, solicite a su administrador el cambio de perfil.</p>
                         <p>Por favor, active su cuenta haciendo clic en el siguiente enlace</p>
                         <a href=http://localhost:4200/verify-token-from-email/${token}> Activar cuenta</a>
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
             message: 'Ha ocurrido un error. -> signUp...' + error,
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
     try {
          const userToLog = await db.users.findOne({
             where: {id_number: req.body.id_number},
             include: [
                 { model: db.users_roles,
                     include: [
                         {model: db.roles}
                     ]
                 },
              ]
         })
         console.log('Warning...', userToLog)
         if (userToLog){
             if (!userToLog.status){ //If user.status is inactive   
                 return res.json({
                     message: 'Acceso denegado. Cuenta no ha sido confirmada.',
                     data: null,
                     token: null
                 })
             }             
             const matchPassword = await bcrypt.compare(req.body.password, userToLog.password)
             if (matchPassword) {
                 const token = jwt.sign({id: userToLog.id}, config.SECRET, {
                     expiresIn: 7200 // Two Hours
                 })
                 let passwordExpiration = (new Date() - new Date(userToLog.reset_date_password) ) / 86400000  
                 let passwordExpired  = false         
                 if (passwordExpiration > 35){
                     passwordExpired = true
                 }   
                 return res.json({
                     message: 'Access granted',
                     data: userToLog,
                     token: token,
                     passwordExpired
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
             msgErrorLogin: 'Ha ocurrido un error. -> verifyTokenFromEmail...' + error,
             data:{}
         })                  
     }
 }
 //------------------------------------------------------------------------------------------------
 export async function getDataForUser(req, res) {
     const id_number = req.body.id_number
     const { fn, col } = Employees.sequelize
     try {
         const nameEmployee = await Employees.findAll({
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
         console.log('Method -> getDataForUser...', error);
         res.status(500).json({
             message: 'Ha ocurrido un error. -> getDataForUser...' + error,
             data:{}
         })
     }
 }
 //------------------------------------------------------------------------------------------------
 export async function resetPassword(req, res){
     const {id_number, name, email} = req.body
     console.log('dsfgdsfgds', req.body);
     try {
         const user = await db.users.findOne({
             where: {
                 id_number: id_number
             }
         })
         
         if (user){

             const token = jwt.sign({id: user.id}, config.SECRET, {
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
                 to: user.email,
                 subject: 'Por favor confirme la restauración de su password.',
                 html: 
                     `<div>
                         <h1>Confirmar restauración password.</h1>
                         <h2>Hola, ${name}</h2>
                         <p>Para confirmar la restauración de tu password, por favor haz click en el siguiente link</p>
                         <a href=http://localhost:4200/set-new-password/${token}> Confirmar solicitud</a>
                         <br>
                      </div>`,
             }).catch(err => console.log('Error al enviar email', err));             
         }
     } catch (error) {
         console.log('resetPassword->',error)         
     }
 }
 //------------------------------------------------------------------------------------------------
 export async function verifyTokenToRestorePassword(req, res){
     //This method uses the authjwt.verifyTokenToRestorePassword from middlewares. Please do not erase
 }
 //------------------------------------------------------------------------------------------------
 export async function updatePassword(req, res){
     const { id } = req.params
     const { password } = req.body

     const salt = await bcrypt.genSalt(10)
     const encryptedPassword = await bcrypt.hash(password, salt)
    
     try {
         const userToUpdate = await db.users.findOne({
             where: {
                 id: id
             }
         })

         if (userToUpdate){
            const updatedUser = await db.users.update(
                 {password: encryptedPassword, reset_date_password: new DATE() },
                 {where: {id}}
             )
             return res.json({paswordUpdated: true, message: 'Password actualizado'})            
         }                  
     } catch (error) {
          console.log('updatePassword->',error)              
     }
 }
 //------------------------------------------------------------------------------------------------
 export async function changePassword(req, res){
     const { id } = req.params
     const { password } = req.body

     const salt = await bcrypt.genSalt(10)
     const encryptedPassword = await bcrypt.hash(password, salt)
   
     try {
         const userToUpdate = await db.users.findOne({
             where: {
                 id: id
             }
         })

         if (userToUpdate){
             const updatedUser = await db.users.update(
                 {password: encryptedPassword, reset_date_password: new DATE() },
                 {where: {id}}
             )
             return res.json({paswordUpdated: true, message: 'Password actualizado'})            
         }                  
     } catch (error) {
          console.log('changePassword->',error)              
     }
 }
//------------------------------------------------------------------------------------------------