 import Employess from '../models_single/employees.model'
 const express = require('express')
 const router = express.Router()
 const { Op } = require("sequelize")
 const { QueryTypes } = require ( 'sequelize' )
 import { sequelize } from '../dbConnection/dbConnection'
 
 //------------------------------------------------------------------------------------------------
 export async function getOne(req, res) {   
     const idEmployee = req.body.idEmployee
    
     try {
         const employee = await sequelize.query(
             `SELECT * FROM employees WHERE ID_AFILIADO = (?)`, //Call employers view
             { 
                 replacements: [idEmployee],
                 type: QueryTypes.SELECT 
             }               
         )
         if (employee){
             res.json({employee}) 
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al obtener un Empleado...', error);           
     } 
 }
 //------------------------------------------------------------------------------------------------
 export async function getAll(req, res){ 
     const status = req.body.status || ['A', 'I','M']
     const cutOffDate = req.body.cutOffDate || new Date().toISOString().substring(0, 10) //Formato de la fecha AAAA-MM-DD
     const filterName = req.body.filterName.filter || 'A'
     const forSearchHelp = req.body.forSearchHelp || false
     const { fn, col } = Employess.sequelize;
          
     if (forSearchHelp) {
         try {
             
             const employees = await Employess.findAll({
                 attributes: [['cedtra', 'IDENTIFICACION'],
                              [fn('CONCAT',
                              fn('COALESCE',col('prinom'),''),
                              ' ',
                              fn('COALESCE',col('segnom'),''), 
                              ' ',
                              fn('COALESCE',col('priape'),''),
                              ' ',
                              fn('COALESCE',col('segape'),'') ) ,"AFILIADO"],],
                 order: [
                     ['priape', 'ASC']
                 ],
                  where: 
                     sequelize.where ( 
                         sequelize.fn('CONCAT',
                         fn('COALESCE',col('priape'),''),
                         ' ',
                         fn('COALESCE',col('segape'),''), 
                         ' ',
                         fn('COALESCE',col('prinom'),''),
                         ' ',
                         fn('COALESCE',col('segnom'),'') ), 
                         { 
                             [Op.like]: `%${filterName}%` 
                         }
                     ),
                 limit: 50
             })
             if (employees){
                 res.json({employees})
             }else{
                 res.json({
                     message: 'No hay registros coincidentes...'
                 })
             }             
             
         } catch (error) {
             console.log('Se presentó el siguiente error al listar Trabajadores:...', error);
             
         }
     } else { //------------------------------------------------------------- if (forSearchHelp)
         try {
            
             const employees = await sequelize.query(
                `SELECT * FROM employees A WHERE A.CODIGO_ESTADO IN (?) AND A.FECHA_AFILIACION <= (?) ORDER BY A.AFILIADO`,  //Cal Employees view          
                 { 
                     replacements: [status, cutOffDate],
                     type: QueryTypes.SELECT 
                 }
              
             )
             if (employees){
                 res.json({employees})
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
 export async function getBeneficiariesEmployee (req, res){

     const idEmployee = req.body.idEmployee

     try {
         const beneficiariesEmployee = await sequelize.query(
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
             WHERE A.cedtra = (?)
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
             WHERE A.cedtra = (?)`,
             { 
                 replacements: [idEmployee, idEmployee],
                 type: QueryTypes.SELECT 
             }          
         )
         if (beneficiariesEmployee){
             res.json({beneficiariesEmployee})
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
 export async function getPayrollHistory (req, res){
     const idEmployee = req.body.idEmployee

     try {
         const payrollHistory = await sequelize.query(
             `SELECT 
             N.nit AS NIT,
             E.razsoc AS RAZON_SOCIAL,
             N.codsuc AS SUCURSAL,
             N.periodo AS PERIODO,
             N.porapo AS PORCENTAJE,
             N.hortra AS HORAS,
             FORMAT(N.suebas, 2) as SUELDO
             FROM subsi10 N
             LEFT JOIN subsi02 E ON N.nit = E.nit
             WHERE N.cedtra = (?)
             ORDER BY N.periodo DESC`,
             { 
                 replacements: [idEmployee],
                 type: QueryTypes.SELECT 
             }          
         )
         if (payrollHistory){
             res.json({payrollHistory})
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
            })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al historial de nómina:...', error);
     }     
 } 
 //------------------------------------------------------------------------------------------------
 export async function getPayrollHistoryUp(req, res){
    const idEmployee = req.body.idEmployee

    try {
        const payrollHistoryUp = await sequelize.query(
             `SELECT
             APO.numrad AS PLANILLA,
             APO.nit AS NIT,
             APO.razpla AS RAZON_SOCIAL,
             APO.perapo AS PERIODO_APORTE,
             APO.periodo AS PERIODO,
             APO.fecrec AS FECHA_RECAUDO,
             PU.tarapo AS PORCENTAJE_APORTE,
             APO.fecsis AS FECHA_PROCESO,
             PU.cedtra AS IDENTIFICACION_AFILIADO,
             CONCAT(COALESCE(PU.PRIAPE,''), ' ', COALESCE(PU.SEGAPE,''), ' ', COALESCE(PU.PRINOM,''), ' ', COALESCE(PU.SEGNOM,'')) AS AFILIADO,
             FORMAT(PU.valapo,2) AS VALOR_APORTE,
             FORMAT(PU.valnom,2) AS VALOR_NOMINA,
             PU.diatra AS DIAS,
             PU.ingtra AS INGRESO,
             PU.novret AS RETIRO,
             PU.novvps AS VPS,
             PU.novvts as VTS,
             '' as SLN,
             '' as IGE,
             PU.incnom AS LMA
             FROM subsi64 APO 
             LEFT JOIN subsi65 PU ON APO.numero = PU.numero 
             WHERE PU.cedtra = (?)
             ORDER BY periodo DESC`,
             { 
                 replacements: [idEmployee],
                 type: QueryTypes.SELECT 
             }          
         )
         if (payrollHistoryUp){
             res.json({payrollHistoryUp})
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
            })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al listar planilla única:...', error);
     }     
 } 
//------------------------------------------------------------------------------------------------
 export async function getMonetarySubsidy(req, res){
     const idEmployee = req.body.idEmployee

     try {
         const monetarySubsidy = await sequelize.query(
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
             WHERE P.cedtra = (?)
             ORDER BY P.periodo DESC `,
             { 
                 replacements: [idEmployee],
                 type: QueryTypes.SELECT 
             }          
          )
          if (monetarySubsidy){
             res.json({monetarySubsidy})
          }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Subsidios pagados:...', error);           
     }     
 } 
//------------------------------------------------------------------------------------------------
export async function getEmployeesToCheckStatus(req, res){   

     const valuesToConsult = req.body    
     try {
         const employeesToCheckStatus = await sequelize.query(
             'SELECT * FROM checkEmployeesStatus A WHERE A.ID_AFILIADO IN (?)',
             { 
                 replacements: [valuesToConsult],
                 type: QueryTypes.SELECT 
             }                        
         )
         if (employeesToCheckStatus){
             res.json({employeesToCheckStatus})
             console.log('Results....', employeesToCheckStatus)
         }else{
             res.json({
                 message: 'No hay registros coincidentes...'
             })
         }                    
     } catch (error) {
         console.log('Se presentó el siguiente error al listar Empleados:...', error);           
     }        
}
//------------------------------------------------------------------------------------------------
export async function updateEmployeesStatus(req, res){   
     const valuesToConsult = req.body.valuesToConsult.toString()
     const status = req.body.status
     const reason = req.body.selectedReason
     const idEmployer = req.body.idEmployer || ''

     try {
         const results = await sequelize.query(             
             `call updateStatusEmployees(?,?,?,?)`,
             { 
                 replacements: [valuesToConsult, status, reason, idEmployer],
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