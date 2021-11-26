 import Afiliados from '../models_single/s_afiliados.model'
 const express = require('express')
 const router = express.Router()
 const { Op } = require("sequelize")
 const { QueryTypes } = require ( 'sequelize' )
 //import sequelize from 'sequelize'
 import { sequelize } from '../dbConnection/dbConnection'
  //----------------------------------------------------------------- 
  export async function getAll__(req, res){      
    const a = ['8510455', '73161577', '73194399', '1047389898'] // Este arreglo vendrá del front
    try {        
        const afiliados = await Afiliados.findAll({
             where:{
                 cedtra: {
                     [Op.in]: a
                 }                
             },
             attributes: [                
                 ['cedtra', 'IDENTIFICACION'],
                 ['priape', 'PRIMER APELLIDO'],
                 ['segape', 'SEGUNDO APELLIDO'],
                 ['prinom', 'PRIMER NOMBRE'],
                 ['segnom', 'SEGUNDO NOMBRE'],
                 ['estado', 'ESTADO'],
                 ['nit', 'NIT']                
             ],
             order: [
                 ['priape', 'ASC']
             ]
         })
         if (afiliados){
             res.json({afiliados})
         }else{
             res.json({
                 message: 'No hay afiliados registrados...'
             })
         }         
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Afliados:...', error);         
     } 
}
//-----------------------------------------------------------------
export async function getAll(req, res){      
     //const a = ['8510455', '73161577', '73194399', '1047389898','1060593527']
     const a =  req.body

     try {        
         const afiliados = await sequelize.query(
             `SELECT 
             A.cedtra AS IDENTIFICACION,
             CONCAT(COALESCE(A.priape,''), ' ', 
             COALESCE(A.segape,''), ' ', 
             COALESCE(A.prinom,''), ' ', 
             COALESCE(A.segnom,'')) AS AFILIADO,
             CASE A.estado 
                 WHEN 'A' THEN 'ACTIVO'
                 WHEN 'I' THEN 'INACTIVO'
                 WHEN 'M' THEN 'MUERTO'
             END AS ESTADO,
             A.fecest AS FECHA_ESTADO,
             A.nit AS NIT,
             E.razsoc AS RAZON_SOCIAL
             FROM subsi15 A
             LEFT JOIN subsi02 E ON A.nit = E.NIT
             WHERE A.cedtra in (?) 
             ORDER BY A.priape `,
             { 
                 replacements: [a],
                 type: QueryTypes.SELECT 
             }
         )
         if (afiliados){
             console.log(afiliados)
             res.json({afiliados})
         }else{
             res.json({
                 message: 'No hay registros registros coincidentes...'
             })
         }         
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Afliados:...', error);         
     } 
}
//-----------------------------------------------------------------
export async function checkWorkerStatus(req, res) {
     try {
        
     } catch (error) {
        
     }
}

//-----------------------------------------------------------------
