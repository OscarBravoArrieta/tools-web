 import jwt from 'jsonwebtoken'
 import config from  '../config'
 const db = require ('../models')
 export const verifyToken = async (req, res, next) => {
     try {
         const token = req.headers["x-access-token"]
         if (!token) return res.status(403).json({tokenReceived: false, message: "No hemos recibido un token"})       
         const decoded = jwt.verify(token, config.SECRET) 
         req.userId = decoded.id //Hará que el id de usuario este disponible en todas las funicones que tienen request que están escritas debajo de ésta
         const user = await db.users.findOne({
             where: {
                 id: decoded.id
             }
         }) 
         if(!user) return res.status(404)({userfound: false, message: 'Usuario no existe'})
         next()           
     } catch (error) {
             console.log('verifyToken...This is the error...',error)
             return res.status(401).json({tokenIsValid: false, message: 'No autorizado'})
     }
 }
 // ------------------------------------------------------------------------------------------------------
 export const verifyTokenFromEmail = async (req, res, next) => {  
     const token = req.params.token   
     const decoded = jwt.verify(token, config.SECRET)
     try {
         const token = req.params.token
         const decoded = jwt.verify(token, config.SECRET)
         const user = await db.users.findOne({
             where: {id: decoded.id}
         })
         if (user){
             const updatedUser = await db.users.update(
                 {status: true},
                 {where: {id: decoded.id}}
             )

             const lastUpdate = await db.users.findOne({
                 where: {
                     id: decoded.id
                 }
             })

             return res.json({accountConfirmed: lastUpdate.status, currentId: decoded.id, message: 'Cuenta ha sido activada.'})
             
         }
         if(!user) return res.status(404)({userfound: false, message: 'Usuario no existe'})
         next()                          
     } catch (error) {
         console.log('verifyTokenFromEmail, This is the error...',error)
         return res.status(401).json({tokenIsValid: false, message: 'No autorizado...'})            
     }
 }
 // ------------------------------------------------------------------------------------------------------
 export const verifyTokenToRestorePassword = async(req, res, next) => {
     const token = req.params.token   
     const decoded = jwt.verify(token, config.SECRET)
     try {
         const token = req.params.token
         const decoded = jwt.verify(token, config.SECRET)
         const user = await db.users.findOne({
             where: {id: decoded.id}
         })
         if (user){
             return res.json({accountConfirmed: true, currentId: decoded.id, message: 'Restauración habilitada.'})
         }
         if(!user) return res.status(404)({userfound: false, message: 'Usuario no existe'})
         next()                    
     } catch (error) {
         console.log('verifyTokenToRestorePassword, This is the error...',error)
         return res.status(401).json({tokenIsValid: false, message: 'No autorizado...'})                     
     }
 }
 // ------------------------------------------------------------------------------------------------------