 import Gener18 from '../models_single/gener18.model'
 const express = require('express')
 const router = express.Router()

 //----------------------------------------------------------------- 
 export async function getAllGener18(req, res){
     try {        
         const gener18 = await Gener18.findAll({
             attributes: ['coddoc', 'detdoc', 'codrua'],
             order: [
                 ['coddoc', 'ASC']
             ]
         })
         if (gener18){
             res.json({gener18})
             console.log({gener18});                         
         }else{
             res.json({
                 message: 'No hay gener18 registrados...'
             })
         }         
     } catch (error) {
         console.log('Se presentó el siguiente error al listar gener18:...', error);         
     } 
 }
 //-----------------------------------------------------------------
 
 