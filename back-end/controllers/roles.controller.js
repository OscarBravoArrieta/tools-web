 const db = require('../models');
 export async function getAll(req, res){
     try {
         const roles = await db.roles.findAll ({
             attributes: ['id', 'rol_name', 'description'],
             roles: [
                 ['rol_name', 'ASC']
             ]
         })
         if (roles){
             res.json({roles});
         }         
        
     } catch (error) {
         console.log(error);
         res.status(500).json({
             msgErrorGetAll: 'Ha ocurrido un error al obtener la lista de roles...' + error,
             data:{}
         })        
     }
 }