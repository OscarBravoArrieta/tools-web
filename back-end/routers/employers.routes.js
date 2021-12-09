 import { Router } from 'express'
 const router = Router() 
 import * as employersCtrl from '../controllers/employers.controller'
 import * as authjwt from '../middlewares/authjwt'
 
 router.put('/', employersCtrl.getAll)
 router.put('/getEmployeesEmployer',  [authjwt.verifyToken], employersCtrl.getEmployeesEmployer)
 router.put('/getBeneficiariesEmployer', employersCtrl.getBeneficiariesEmployer)
 router.put('/getPaymentsEmployer', employersCtrl.getPaymentsEmployer)
 router.put('/getPayrollEmployer', employersCtrl.getPayrollEmployer)
 router.put('/getEmployersToCheckStatus', employersCtrl.getEmployersToCheckStatus)
 router.put('/getEmployersToCheckStatus', employersCtrl.getEmployersToCheckStatus)
  
 router.post('/updateEmployerStatus', employersCtrl.updateEmployerStatus)
  
 export default router