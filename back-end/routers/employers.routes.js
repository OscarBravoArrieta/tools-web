 import { Router } from 'express'
 const router = Router() 
 import * as employersCtrl from '../controllers/employers.controller'
 
 router.put('/', employersCtrl.getAll)
 router.put('/getEmployeesEmployer', employersCtrl.getEmployeesEmployer)
 router.put('/getBeneficiariesEmployer', employersCtrl.getBeneficiariesEmployer)
 router.put('/getPaymentsEmployer', employersCtrl.getPaymentsEmployer)
 router.put('/getPayrollEmployer', employersCtrl.getPayrollEmployer)
 router.put('/getEmployersToCheckStatus', employersCtrl.getEmployersToCheckStatus)
 router.put('/getEmployersToCheckStatus', employersCtrl.getEmployersToCheckStatus)
  
 router.post('/updateEmployerStatus', employersCtrl.updateEmployerStatus)
  
 export default router