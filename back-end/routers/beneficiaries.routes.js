 import { Router } from 'express'
 const router = Router() 
 import * as beneficiariesCtrl from '../controllers/beneficiaries.controller'

 router.put('/', beneficiariesCtrl.getAll)
 router.put('/beneficiaryMonetarySubsidy', beneficiariesCtrl.beneficiaryMonetarySubsidy)
 router.put('/getBeneficiariesToCheckStatus', beneficiariesCtrl.getBeneficiariesToCheckStatus)
 router.put('/getSpousesToCheckStatus', beneficiariesCtrl.getSpousesToCheckStatus)
 router.put('/updateBeneficiariesStatus', beneficiariesCtrl.updateBeneficiariesStatus)

 export default router