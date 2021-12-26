 import Beneficiaries from '../models_single/beneficiaries.model'
 const express = require('express')
 const router = express.Router()
 const { Op } = require("sequelize")
 const { QueryTypes } = require ( 'sequelize' )
 import { sequelize } from '../dbConnection/dbConnection'

 export async function getAll(req, res) { 
     console.log('ESTADO......',req.body.status)
     const status = req.body.status || ['A', 'I', 'M']
     const filterName = req.body.filterName.filter || 'A'
     const forSearchHelp = req.body.forSearchHelp || false

     const { fn, col } = Beneficiaries.sequelize;
         
     if (forSearchHelp) {
         try {             
             const beneficiaries = await Beneficiaries.findAll({
                 attributes: [['codben', 'CODIGO'],
                             ['documento', 'IDENTIFICACION'],
                             [fn('CONCAT', col('priape'), ' ', col('segape'), ' ', col('prinom'), ' ',col('segnom')),"BENEFICIARIO"]],
                 order: [
                     ['priape', 'ASC']
                 ],

                 limit: 50
             })
             if (beneficiaries){
                 res.json({beneficiaries})
             }else{
                 res.json({
                     message: 'No hay registros coincidentes...'
                 })
             }             
            
         } catch (error) {
             console.log('Se presentó el siguiente error al listar Beneficiarios:...', error);            
         }
     } else { //------------------------------------------------------------- if (forSearchHelp)
         try {
             const beneficiaries = await sequelize.query(
                 `SELECT * FROM beneficiaries B WHERE B.CODIGO_ESTADO  IN (?)`, //Cal the Beneficiaries view
                 { 
                     replacements: [status],
                     type: QueryTypes.SELECT 
                 }             
            )
             if (beneficiaries){
                 console.log('Total beneficiarios...', Object.keys(beneficiaries).length)
                 res.json({beneficiaries})
             }else{
                 res.json({
                     message: 'No hay registros coincidentes...'
                 })
             }                    
         } catch (error) {
             console.log('Se presentó el siguiente error al listar Afiliados:...', error);           
         }
     }
 }
 //------------------------------------------------------------------------------------------------ 
 export async function beneficiaryMonetarySubsidy(req, res){

     const beneficiaryCode = req.body.beneficiaryCode

     try {
         const monetarySubsidyBeneficiarie = await sequelize.query(
             `SELECT 
             P.nit AS NIT,
             E.razsoc AS RAZON_SOCIAL,
             P.codsuc AS SUCURSAL,
             P.pergir AS PERIODO_GIRO,
             P.periodo AS PERIODO_PAGADO,
             P.cedres AS RESPONSABLE,
             P.cedcon AS CONYUGE,
             P.codben AS CODIGO_BENEFICIARIO,
             CONCAT(COALESCE(B.priape,''), ' ', COALESCE(B.SEGAPE,''), ' ', COALESCE(B.PRINOM,''), ' ', COALESCE(B.SEGNOM,'')) AS BENEFICIARIO,
             P.tipgir AS TIPO_GIRO,
             P.pago AS FORMA_PAGO,
             P.numcue AS CUENTA,
             P.numche AS CHEQUE,
             P.numcuo AS NUMERO_CUOTAS,
             FORMAT(P.valor,2) AS VALOR_SUBDIDIO,
             P.valaju AS AJUSTE,
             P.valcre AS VALOR_CREDITO,
             P.anulado AS ANULADO,
             P.feccon AS FECHA_CONSIGNACION
             FROM subsi09 P 
             LEFT JOIN subsi02 E ON P.nit = E.nit
             LEFT JOIN subsi22 B ON P.codben = B.codben 
             WHERE P.codben = (?)
             ORDER BY P.periodo DESC`,
             { 
                 replacements: [beneficiaryCode],
                 type: QueryTypes.SELECT 
             }          
         )
         if (monetarySubsidyBeneficiarie){
             res.json({monetarySubsidyBeneficiarie})
         } else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Subsidios pagados:...', error);           
     }     
 } 
//------------------------------------------------------------------------------------------------
 export async function getBeneficiariesToCheckStatus(req, res){   

     const valuesToConsult = req.body

     try {
         const beneficiariesToCheckStatus = await sequelize.query(
            `SELECT * FROM checkBeneficiariesStatus WHERE CODIGO_BENEFICIARIO in (?)`,
             { 
                 replacements: [valuesToConsult],
                 type: QueryTypes.SELECT 
             }                        
         )
         if (beneficiariesToCheckStatus){
             res.json({beneficiariesToCheckStatus})
             console.log(beneficiariesToCheckStatus)
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al consultar estado de Beneficiarios:...', error);           
     }        
}
//------------------------------------------------------------------------------------------------
export async function getSpousesToCheckStatus(req, res){   

     const valuesToConsult = req.body

     try {
         const spousesToCheckStatus = await sequelize.query(
             `SELECT * FROM checkStatusSpouses WHERE DOCUMENTO_CONYUGE in (?)`,
             { 
                 replacements: [valuesToConsult],
                 type: QueryTypes.SELECT 
             }                        
         )
         if (spousesToCheckStatus){
             res.json({spousesToCheckStatus})
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al consultar estado de Cónyuges:...', error);           
     }        
}
//------------------------------------------------------------------------------------------------
export async function updateBeneficiariesStatus(req, res){   

     //updateStatusBeneficiaries`(IN identificationNumbers text, IN selectedCodeAction CHAR(1), IN status CHAR(1), IN reason CHAR(2))
     const valuesToConsult = req.body.valuesToConsult.toString()
     const action = req.body.selectedCodeAction
     const status = req.body.status
     const reason = req.body.selectedReason

     try {
         const results = await sequelize.query(             
            `call updateStatusBeneficiaries(?,?,?,?)`,
             { 
                 replacements: [valuesToConsult, action, status, reason],
                 type: QueryTypes.SELECT 
             }                        
         )
         if (results){
             //res.json({results})
             console.log(results)
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })           
         }               
     } catch (error) {
         console.log('Se presentó el siguiente error al actualizar el estado:...', error);           
     } 
 }
//------------------------------------------------------------------------------------------------



