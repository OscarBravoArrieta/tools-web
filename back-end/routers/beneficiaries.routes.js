 import { Router } from 'express'
 const router = Router() 
 import * as beneficiariesCtrl from '../controllers/beneficiaries.controller'
 import * as authjwt from '../middlewares/authjwt'
 
 router.put('/',[authjwt.verifyToken], beneficiariesCtrl.getAll)
 router.put('/getOne',[authjwt.verifyToken], beneficiariesCtrl.getOne)
 router.put('/beneficiaryMonetarySubsidy', beneficiariesCtrl.beneficiaryMonetarySubsidy)
 router.put('/getBeneficiariesToCheckStatus', [authjwt.verifyToken], beneficiariesCtrl.getBeneficiariesToCheckStatus)
 router.put('/getSpousesToCheckStatus', [authjwt.verifyToken], beneficiariesCtrl.getSpousesToCheckStatus)
 router.put('/updateBeneficiariesStatus', [authjwt.verifyToken], beneficiariesCtrl.updateBeneficiariesStatus)

 export default router