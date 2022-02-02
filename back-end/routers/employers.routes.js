 import { Router } from 'express'
 const router = Router() 
 import * as employersCtrl from '../controllers/employers.controller'
 import * as authjwt from '../middlewares/authjwt'
 
 router.put('/',  [authjwt.verifyToken], employersCtrl.getAll)
 router.put('/getOne', [authjwt.verifyToken], employersCtrl.getOne)
 router.put('/getEmployeesEmployer', employersCtrl.getEmployeesEmployer)
 router.put('/getBeneficiariesEmployer', employersCtrl.getBeneficiariesEmployer)
 router.put('/getPaymentsEmployer', employersCtrl.getPaymentsEmployer)
 router.put('/getPayrollEmployer', employersCtrl.getPayrollEmployer)
 router.put('/getEmployersToCheckStatus', [authjwt.verifyToken], employersCtrl.getEmployersToCheckStatus)
 router.post('/updateEmployerStatus', [authjwt.verifyToken], employersCtrl.updateEmployerStatus)
 router.put('/payrollReport', [authjwt.verifyToken], employersCtrl.payrollReport)
   
 export default router