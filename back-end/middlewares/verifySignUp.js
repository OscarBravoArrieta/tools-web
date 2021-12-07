
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
            
             return res.json({userFound: true, message: req.body.id_number + ', Ya se encuentra registrado.'})
         } 
         next()
         
     } catch (error) {
         console.log(error)
         
     }

 }
 // -----------------------------------------------------------------------------------------------



