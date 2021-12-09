 import { Router } from 'express'
 const router = Router() 
 import * as beneficiariesCtrl from '../controllers/beneficiaries.controller'
 import * as authjwt from '../middlewares/authjwt'

 //router.put('/', [authjwt.verifyToken], beneficiariesCtrl.getAll)
 router.put('/',[authjwt.verifyToken], beneficiariesCtrl.getAll)
 router.put('/beneficiaryMonetarySubsidy', beneficiariesCtrl.beneficiaryMonetarySubsidy)
 router.put('/getBeneficiariesToCheckStatus', beneficiariesCtrl.getBeneficiariesToCheckStatus)
 router.put('/getSpousesToCheckStatus', beneficiariesCtrl.getSpousesToCheckStatus)
 router.put('/updateBeneficiariesStatus', beneficiariesCtrl.updateBeneficiariesStatus)

 export default router