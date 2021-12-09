 import { Router } from 'express'
 const router = Router() 
 import * as employeesCtrl from '../controllers/employees.controller'
 import * as authjwt from '../middlewares/authjwt'

 router.put('/', [authjwt.verifyToken], employeesCtrl.getAll)
 router.put('/getBeneficiariesEmployee', employeesCtrl.getBeneficiariesEmployee)
 router.put('/getPayrollHistory', employeesCtrl.getPayrollHistory)
 router.put('/getPayrollHistoryUp', employeesCtrl.getPayrollHistoryUp)
 router.put('/getMonetarySubsidy', employeesCtrl.getMonetarySubsidy)
 router.put('/getEmployeesToCheckStatus', employeesCtrl.getEmployeesToCheckStatus)
 router.put('/updateEmployeesStatus', employeesCtrl.updateEmployeesStatus)
  
 export default router