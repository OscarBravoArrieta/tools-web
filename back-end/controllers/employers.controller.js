 import Employers from '../models_single/employers.model'
 const express = require('express')
 const router = express.Router()
 const { Op } = require("sequelize")
 const { QueryTypes } = require ( 'sequelize' )
 import { sequelize } from '../dbConnection/dbConnection'
 
 //------------------------------------------------------------------------------------------------
 export async function getAll(req, res){   

     const status = req.body.status || ['A', 'I']
     const cutOffDate = req.body.cutOffDate || new Date().toISOString().substring(0, 10) //Formato de la fecha AAAA-MM-DD
     const filterName = req.body.filterName.filter || 'A'
     const forSearchHelp = req.body.forSearchHelp || false  

     if (forSearchHelp) {
         try {
             const employers = await Employers.findAll({
                 attributes: [['razsoc', 'RAZON_SOCIAL'], ['nit', 'NIT']],
                     order: [
                         ['razsoc', 'ASC']
                     ],
                     where: {
                         razsoc: {
                             [Op.like]: `%${filterName}%`
                         }
                     },
                     limit: 50
                 })    
                 if (employers){
                     res.json({employers})
                 }else{
                     res.json({
                         message: 'No hay registros coincidentes...'
                     })
                 }
         } catch (error) {
             console.log('Se presentó el siguiente error al listar Empleadores:...', error)
         }          
     } else { //------------------------------------------------------------- if (forSearchHelp)

         try {
             const employers = await sequelize.query(
                 `SELECT * FROM employers WHERE CODIGO_ESTADO IN (?) AND FECHA_AFILIACION <= (?) ORDER BY RAZON_SOCIAL`, //Call employers view
                 { 
                     replacements: [status, cutOffDate],
                     type: QueryTypes.SELECT 
                 }               
             )
             if (employers){
                 res.json({employers})
             }else{
                 res.json({
                     message: 'No hay registros coincidentes...'
                 })
             }                    
         } catch (error) {
             console.log('Se presentó el siguiente error al listar Empleadores:...', error);           
         }    
     }
 }
 //------------------------------------------------------------------------------------------------
 export async function getEmployeesEmployer (req, res){

     const idEmployer = req.body.idEmployer
         
     try {
         const employeesEmployer = await sequelize.query(
             `SELECT 
             T.codrua AS TIPO_IDENTIFICACION,
             A.cedtra AS ID_AFILIADO,
             IF (A.ESTADO = 'A', 'ACTIVO', 'INACTIVO') AS ESTADO,
             TA.detalle AS TIPO_COTIZANTE,
             CONCAT(COALESCE(A.PRIAPE,''), ' ', COALESCE(A.SEGAPE,''), ' ', COALESCE(A.PRINOM,''), ' ', COALESCE(A.SEGNOM,'')) AS AFILIADO,
             IF(A.CODCAT IS NULL, 'C', A.CODCAT) AS CATEGORIA,
             A.codciu AS CODIGO_IUDAD_RESIDE,
             C.detciu AS CIUDAD_RESIDE,
             A.direccion AS DIRECCION,
             A.fecafi AS FECHA_AFILIACION,
             A.fecnac AS FECHA_NACE,
             YEAR(CURDATE())-YEAR(A.fecnac) + IF(DATE_FORMAT(CURDATE(),'%m-%d') > DATE_FORMAT(A.fecnac,'%m-%d'), 0 , -1 ) AS EDAD,
             A.sexo AS GENERO,
             A.telefono AS TELEFONO,
             A.email AS CORREO_ELECTRONICO,
             A.salario as SALARIO,
             CASE A.estciv 
                  WHEN '0' THEN 'No aplica'
                  WHEN '1' THEN 'Soltero'
                  WHEN '2' THEN 'Casado'
                  WHEN '3' THEN 'Viudo'
                  WHEN '4' THEN 'Separado'
                  WHEN '5' THEN 'Unión libre'
                  WHEN '6' THEN 'Divorciado'
             END AS ESTADO_CIVIL,
             A.nit AS NIT_EMPRESA,
             E.razsoc AS RAZON_SOCIAL 
             FROM subsi15 A
             LEFT JOIN subsi02 E ON A.nit = E.nit
             LEFT JOIN gener08 C ON A.codciu = C.codciu
             LEFT JOIN gener18 T on A.CODDOC = T.CODDOC
             LEFT JOIN subsi71 TA ON A.tipcot = TA.tipcot
             WHERE A.nit = (?)
             AND A.estado = 'A'
             ORDER BY AFILIADO`,
            { 
                 replacements: [idEmployer],
                 type: QueryTypes.SELECT 
            }          
         )
         if (employeesEmployer){
             res.json({employeesEmployer})
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Trabajadores ABCDE:...', error);           
     }
 }
 //------------------------------------------------------------------------------------------------
 export async function getBeneficiariesEmployer (req, res){

     const idEmployer = req.body.idEmployer

     try {
         const beneficiariesEmployer = await sequelize.query(
             `SELECT
             E.nit AS NIT_EMPRESA,
             E.razsoc AS RAZON_SOCIAL,
             TA.detalle AS TIPO_COTIZANTE,
             A.cedtra AS ID_AFILIADO,
             CONCAT(COALESCE(A.priape,''), ' ', COALESCE(A.segape,''), ' ', COALESCE(A.prinom,''), ' ', COALESCE(A.segnom,'')) AS AFILIADO,
             IF(A.codcat IS NULL, 'C', A.codcat) AS CATEGORIA,
             A.salario AS SALARIO,
             C.detciu AS CIUDAD_RESIDE,
             A.direccion AS DIRECCION_AFILIADO,
             A.telefono AS TELEFONO,
             B.documento AS DOCUMENTO_BENEFICIARIO,
             B.codben AS CODIGO_BENEFICIARIO,
             CONCAT(COALESCE(B.priape,''), ' ', COALESCE(B.segape,''), ' ', COALESCE(B.prinom,''), ' ', COALESCE(B.segnom,'')) AS BENEFICIARIO,
             T.codrua AS TIPO_ID_BENEFICIARIO,
             IF(B.estado = 'A', 'ACTIVO', 'INACTIVO') AS ESTADO,
             B.sexo AS GENERO_BENEFICIARIO,
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
             WHERE A.nit = (?)
             AND B.estado  = 'A' 
             AND A.Estado = 'A' 
             AND E.estado = 'A' 
             UNION 
             SELECT 
             E.nit AS NIT_EMPRESA,
             E.razsoc AS RAZON_SOCIAL,
             TA.detalle AS TIPO_COTIZANTE,
             A.cedtra AS ID_AFILIADO,
             CONCAT(COALESCE(A.priape,''), ' ', COALESCE(A.segape,''), ' ', COALESCE(A.prinom,''), ' ', COALESCE(A.segnom,'')) AS AFILIADO,
             IF(A.codcat IS NULL, 'C', A.codcat) AS CATEGORIA,
             A.salario AS SALARIO,
             CIU.detciu AS CIUDAD_RESIDE,
             A.direccion AS DIRECCION_AFILIADO,
             A.telefono AS TELEFONO,
             C.cedcon AS DOCUMENTO_CONYUGE,
             '' AS CODIGO_BENEFICIARIO,
             CONCAT(COALESCE(C.priape,''), ' ', COALESCE(C.segape,''), ' ', COALESCE(C.prinom,''), ' ', COALESCE(C.segnom,'')) AS BENEFICIARIO,
             T.codrua AS TIPO_ID_BENEFICIARIO,
             IF(C.estado = 'A', 'ACTIVO', 'INACTIVO') AS ESTADO,
             C.sexo AS GENERO_BENEFICIARIO,
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
             LEFT JOIN subsi21 B2 ON C.cedcon = B2.cedcon 
             LEFT JOIN gener18 T ON C.coddoc = T.coddoc 
             INNER JOIN subsi15 A ON C.cedcon = B2.cedcon AND A.cedtra = B2.cedtra 
             LEFT JOIN subsi02 E ON A.nit  = E.nit AND B2.cedtra = A.cedtra 
             LEFT JOIN subsi71 TA ON A.tipcot = TA.tipcot 
             LEFT JOIN gener08 CIU ON A.codciu = CIU.codciu AND C.cedcon = B2.cedcon AND A.cedtra = B2.cedtra 
             WHERE A.nit = (?)
             AND C.estado  = 'A' 
             AND A.Estado = 'A' 
             AND E.estado = 'A'`,
             { 
                 replacements: [idEmployer, idEmployer],
                 type: QueryTypes.SELECT 
             }          
         )
         if (beneficiariesEmployer){
             res.json({beneficiariesEmployer})
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Beneficiarios:...', error);           
     }
 }
 //------------------------------------------------------------------------------------------------
 export async function getPaymentsEmployer (req, res){

     const idEmployer = req.body.idEmployer

     try {
         const paymentsEmployer = await sequelize.query(
             `SELECT 
             AP.codsuc AS SUCURSAL,
             AP.marca AS MARCA,
             AP.documento AS DOCUMENTO,
             AP.numrec AS RECIBO,
             AP.periodo AS PERIODO,
             FORMAT(AP.valnom,2) AS NOMINA,
             FORMAT(AP.valcon,2) AS VALOR_CONSIGNADO,
             FORMAT(AP.valint,2) AS INTERES,
             AP.fecpag AS FECHA_PAGO,
             AP.fecsis AS FECHA_SISTEMA
             FROM subsi11 AP
             WHERE AP.nit = (?)
             ORDER BY AP.periodo DESC`,
             { 
                 replacements: [idEmployer],
                 type: QueryTypes.SELECT 
             }          
         )
         if (paymentsEmployer){
             res.json({paymentsEmployer})
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al listar los Aportes del Empleador:...', error);
     }     
 }
//------------------------------------------------------------------------------------------------ 
export async function getPayrollEmployer (req, res){

     const idEmployer = req.body.idEmployer

     try {
         const payrollEmployer = await sequelize.query(
             `SELECT 
             PU.numero AS NUMERO,
             PU.numrad AS RADICADO,
             PU.perapo AS PERIODO,
             PU.fecrec AS FECHA_PAGO,
             PU.fecsis AS FECHA_SISTEMA,
             FORMAT(PU.valcon,2) AS VALOR_CONSIGNADO,
             FORMAT(PU.valint,2) AS INTERESES,
             PU.tottra AS NUM_TRABAJADORES
             FROM subsi64 PU
             WHERE PU.nit = (?)
             ORDER BY PU.periodo DESC`,
             { 
                 replacements: [idEmployer],
                 type: QueryTypes.SELECT 
             }          
         )
         if (payrollEmployer){
             res.json({payrollEmployer})
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al listar las Planillas del Empleador:...', error);           
     }
 }
 //------------------------------------------------------------------------------------------------ 
 export async function getEmployersToCheckStatus(req, res){   

     const valuesToConsult = req.body

     try {
         const employersToCheckStatus = await sequelize.query(
            'SELECT * FROM checkEmployersStatus E WHERE E.id in (?)',
             { 
                 replacements: [valuesToConsult],
                 type: QueryTypes.SELECT 
             }                        
         )
         if (employersToCheckStatus){
             res.json({employersToCheckStatus})
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Empleadores:...', error);           
     }        
 }
 //------------------------------------------------------------------------------------------------
 export async function updateEmployerStatus(req, res){   

     //let parameters = {valuesToConsult: this.valuesToConsult, action: this.selectedAction, status: this.selectedSatus, selectedReason: this.selectedReason}
     const valuesToConsult = req.body.valuesToConsult.toString()
     const status = req.body.status
     const reason = req.body.selectedReason

     try {
         const results = await sequelize.query(             
             `call updateStatusEmployers(?,?,?)`,
             { 
                 replacements: [valuesToConsult, status, reason],
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
 export async function payrollReport(req, res){
     const startPeriod = req.body.startPeriod
     const endPeriod = req.body.endPeriod
     try {
         const  payrollReport = await sequelize.query(
             `SELECT * FROM employersPayment WHERE PERIODO BETWEEN ? AND ?`, //Call employers view
             { 
                 replacements: [startPeriod, endPeriod],
                 type: QueryTypes.SELECT 
             }               
         )
         if (payrollReport){
             res.json({payrollReport})             
         } else {
            res.json({
                message: 'No hay registros coincidentes...'
            })             
         }   
     } catch (error) {
         console.log('Se presentó el siguiente error al generar el reporte de nómina:...', error);
     }
 }
 //------------------------------------------------------------------------------------------------

 

