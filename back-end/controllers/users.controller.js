 const db = require('../models');
  
 export async function getAll(req, res){
     try {
         const users = await db.users.findAll ({
              attributes: ['id', 'id_number', 'name', 'email', 'password', 'status', 'creation_date', 'reset_date_password'],
              order: [
                  ['name', 'ASC']
              ]
         })
         if (users){
             res.json({users});
         }         
         
     } catch (error) {
         console.log(error);
         res.status(500).json({
             msgErrorGetAll: 'Ha ocurrido un error al obtener la lista de usuarios...' + error,
             data:{}
         })
         
     }
 }