
import ReasonForInactivation from '../models_single/reason-for-inactivation.model'
const express = require('express')
const router = express.Router()
const { Op } = require("sequelize")
 const { QueryTypes } = require ( 'sequelize' )
import { sequelize } from '../dbConnection/dbConnection'


//------------------------------------------------------------------------------------------------
export async function getAllReasonForInactivation(req, res){
   
    const filterName = req.body.filter || ['T']
    
    try {
        const reasonForInactivation = await ReasonForInactivation.findAll({
            attributes: [['codest', 'CODIGO_ESTADO'], ['detalle', 'MOTIVO']],
                order: [
                    ['codest', 'ASC']
                ],
                where: {
                    tipo: `${filterName}`
                     
                }
             })    
             if (reasonForInactivation){
                 res.json({reasonForInactivation})
             }else{
                 res.json({
                     message: 'No hay registros coincidentes...'
                 })
             }
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Empleadores:...', error)
     } 
 }
//------------------------------------------------------------------------------------------------




