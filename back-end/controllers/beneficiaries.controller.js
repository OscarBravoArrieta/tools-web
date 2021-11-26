 import Beneficiaries from '../models_single/beneficiaries.model'
 const express = require('express')
 const router = express.Router()
 const { Op } = require("sequelize")
 const { QueryTypes } = require ( 'sequelize' )
 import { sequelize } from '../dbConnection/dbConnection'

 export async function getAll(req, res) { 
     const status = req.body.status || ['A', 'I']
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
                 `SELECT
                 E.nit AS NIT_EMPRESA,
                 E.razsoc AS RAZON_SOCIAL,
                 TA.detalle AS TIPO_COTIZANTE,
                 A.cedtra AS ID_AFILIADO,
                 CONCAT(COALESCE(A.priape,''), ' ', COALESCE(A.segape,''), ' ', COALESCE(A.prinom,''), ' ', COALESCE(A.segnom,'')) AS AFILIADO,
                 IF(A.codcat IS NULL, 'C', A.codcat) AS CATEGORIA,
                 FORMAT(A.salario,2) AS SALARIO,
                 C.detciu AS CIUDAD_RESIDE,
                 A.direccion AS DIRECCION_AFILIADO,
                 A.telefono AS TELEFONO,
                 B.documento AS DOCUMENTO_BENEFICIARIO,
                 B.codben AS CODIGO_BENEFICIARIO,
                 CONCAT(COALESCE(B.priape,''), ' ', COALESCE(B.segape,''), ' ', COALESCE(B.prinom,''), ' ', COALESCE(B.segnom,'')) AS BENEFICIARIO,
                 T.codrua AS TIPO_ID_BENEFICIARIO,
                 IF(B.estado = 'A', 'ACTIVO', 'INACTIVO') AS ESTADO,
                 B.sexo AS GENERO_BENEFICIARIO,
                 B2.fecafi AS FECHA_AFILIACION,
                 B.fecnac AS FECHA_NACE_BENEFICIARIO,
                 YEAR(CURDATE())-YEAR(B.fecnac) + IF(DATE_FORMAT(CURDATE(),'%m-%d') > DATE_FORMAT(B.fecnac,'%m-%d'), 0 , -1 ) AS EDAD,
                 A.codciu AS CODIGO_CIUDAD,
                 C.detciu AS CIUDAD_RESIDE,
                 A.direccion AS DIRECCION,
                 A.email AS EMAIL,
                 A.telefono AS TELEFONO,
                 CASE (A.rural)
                      WHEN 'S' THEN 'RURAL'  --  S = Rural
                      WHEN 'N' THEN 'URBANA'  --  N = No rural. Equivale a Urbano
                 END AS AREA_GEOGRAFICA_RESIDENCIA,
                 CASE (B.captra)
                      WHEN 'N' THEN ''  -- No es discapacitado
                      WHEN 'I' THEN 'DISCAPACITADO'  -- Es discapacitado
                 END AS DISCAPACIDAD_BENEFICIARIO,
                 CASE (B.parent)
                     WHEN '1' THEN 'HIJO'
                     WHEN '2' THEN 'HERMANO'
                     WHEN '3' THEN 'PADRE'
                 END AS PARENTESCO 
                 FROM subsi22 B 
                 LEFT JOIN subsi23 B2 ON B.CODBEN = B2.CODBEN
                 LEFT JOIN gener18 T ON B.CODDOC = T.CODDOC
                 LEFT JOIN subsi15 A ON B.CODBEN = B2.CODBEN AND A.CEDTRA = B2.CEDTRA
                 LEFT JOIN subsi02 E ON A.nit  = E.nit 
                 LEFT JOIN subsi71 TA ON A.tipcot = TA.tipcot 
                 LEFT JOIN gener08 C ON A.codciu = C.codciu AND B.CODBEN = B2.CODBEN AND A.CEDTRA = B2.CEDTRA
                 WHERE B.estado  = (?)
                 AND A.estado = 'A' 
                 AND E.estado = 'A'
                 UNION 
                 SELECT 
                 E.nit AS NIT_EMPRESA,
                 E.razsoc AS RAZON_SOCIAL,
                 TA.detalle AS TIPO_COTIZANTE,
                 A.cedtra AS ID_AFILIADO,
                 CONCAT(COALESCE(A.priape,''), ' ', COALESCE(A.segape,''), ' ', COALESCE(A.prinom,''), ' ', COALESCE(A.segnom,'')) AS AFILIADO,
                 IF(A.codcat IS NULL, 'C', A.codcat) AS CATEGORIA,
                 FORMAT(A.salario,2) AS SALARIO,
                 CIU.detciu AS CIUDAD_RESIDE,
                 A.direccion AS DIRECCION_AFILIADO,
                 A.telefono AS TELEFONO,
                 C.cedcon AS DOCUMENTO_CONYUGE,
                 '' AS CODIGO_BENEFICIARIO,
                 CONCAT(COALESCE(C.priape,''), ' ', COALESCE(C.segape,''), ' ', COALESCE(C.prinom,''), ' ', COALESCE(C.segnom,'')) AS BENEFICIARIO,
                 T.codrua AS TIPO_ID_BENEFICIARIO,
                 IF(C.estado = 'A', 'ACTIVO', 'INACTIVO') AS ESTADO,
                 C.sexo AS GENERO_BENEFICIARIO,
                 B2.fecafi AS FECHA_AFILIACION,
                 C.fecnac AS FECHA_NACE_BENEFICIARIO,
                 YEAR(CURDATE())-YEAR(C.fecnac) + IF(DATE_FORMAT(CURDATE(),'%m-%d') > DATE_FORMAT(C.fecnac,'%m-%d'), 0 , -1 ) AS EDAD,
                 A.codciu AS CODIGO_CIUDAD,
                 CIU.detciu AS CIUDAD_RESIDE,
                 A.direccion AS DIRECCION,
                 A.email AS EMAIL,
                 A.telefono AS TELEFONO,
                 CASE (A.rural)
                      WHEN 'S' THEN 'RURAL'  --  S = Rural
                      WHEN 'N' THEN 'URBANA'  --  N = No rural. Equivale a Urbano
                 END AS AREA_GEOGRAFICA_RESIDENCIA,
                 CASE (C.captra)
                      WHEN 'N' THEN ''  -- No es discapacitado
                      WHEN 'I' THEN 'DISCAPACITADO'  -- Es discapacitado
                 END AS DISCAPACIDAD_BENEFICIARIO,
                 'CONYUGE' AS PARENTESCO
                 FROM subsi20 C
                 INNER JOIN subsi21 B2 ON C.cedcon = B2.cedcon 
                 LEFT JOIN gener18 T ON C.coddoc = T.coddoc 
                 INNER JOIN subsi15 A ON C.cedcon = B2.cedcon AND A.cedtra = B2.cedtra 
                 LEFT JOIN subsi02 E ON A.nit  = E.nit AND B2.cedtra = A.cedtra 
                 LEFT JOIN subsi71 TA ON A.tipcot = TA.tipcot 
                 LEFT JOIN gener08 CIU ON A.codciu = CIU.codciu AND C.cedcon = B2.cedcon AND A.cedtra = B2.cedtra 
                 WHERE C.estado  = (?)
                 AND A.estado = 'A' 
                 AND E.estado = 'A'`,
                 { 
                     replacements: [status, status],
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



