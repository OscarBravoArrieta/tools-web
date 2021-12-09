 import Employess from '../models_single/employees.model'
 const { QueryTypes } = require ( 'sequelize' )
 import bcrypt from 'bcryptjs'
 import jwt from 'jsonwebtoken'
 import config from '../config'
 const db = require ('../models')
 const randomstring = require("randomstring");
 //import cryptoRandomString from 'crypto-random-string'
 //--------------------------------/----------------------------------------------------------------
 export const signUp = async (req, res) => {

    // app.post('/auth/v1/register', async function (req, res) {
    //     try {
    //         let { username, password, email } = req.body;
    //         password = bcrypt.hashSync(password, 10);
    //         const user = await User.create({ username: username, password: password, email: email });
    //         const verificationToken = await VerificationToken.create(
    //               { 
    //                  username: user.dataValues.username, 
    //                  token: cryptoRandomString({ length: 20, type:  }), createdat: new Date(), updatedat: new Date() 
    //               }
    //         )
    //         let jwtTokenEmailVerify = jwt.sign({ email: user.dataValues.email }, 'secret', { expiresIn: "1h" });
    //         await verificationService.sendVerificationEmail(user.dataValues.email, verificationToken.dataValues.token, jwtTokenEmailVerify)
    //         return res.status(200).send(`You have Registered Successfully, Activation link sent to: ${user.dataValues.email}`)

    //     } catch (err) {
    //         console.log("err1 ", err)
    //         return res.status(500);
    //     }
    // })











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
             await verificationService.sendVerificationEmail(email, verificationToken.dataValues.token, token)
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