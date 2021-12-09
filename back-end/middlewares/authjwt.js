 import jwt from 'jsonwebtoken'
 import config from  '../config'
 const db = require ('../models')
 export const verifyToken = async (req, res, next) => {
     try {
         const token = req.headers["x-access-token"]
         console.log('Token recived:...', token);
         if (!token) return res.status(403).json({tokenReceived: false, message: "No hemos recibido un token"})
                 
         const decoded = jwt.verify(token, config.SECRET) 
         req.userId = decoded.id //Hará que el id de usuario este disponible en todas las funicones que tienen request que están escritas debajo de ésta
         console.log('DECODED....', decoded)  
         const user = await db.users.findOne({
             where: {
                 id: decoded.id
             }
         }) 

         if(!user) return res.status(404)({userfound: false, message: 'Usuario no existe'})
         next()           
     } catch (error) {
             console.log('This is the error.....',error)
             return res.status(401).json({tokenIsValid: false, message: 'No autorizado...'})        
     }
}
