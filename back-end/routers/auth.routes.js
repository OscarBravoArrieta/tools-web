import { Router } from 'express'
const router = Router()
import * as verifySignUp from '../middlewares/verifySignUp'
import * as authCtrl from '../controllers/auth.controller'
import * as authjwt from '../middlewares/authjwt'

router.post('/getDataForUser', [verifySignUp.userFound], authCtrl.getDataForUser)
router.post('/signup', [verifySignUp.userFound], authCtrl.signUp)
router.post('/signin', [verifySignUp.checkUserStatus], authCtrl.signIn)
router.get('/verifyTokenFromEmail/:token', [authjwt.verifyTokenFromEmail], authCtrl.verifyTokenFromEmail)
router.post('/resetPassword', authCtrl.resetPassword)
router.get('/verifyTokenToRestorePassword/:token', [authjwt.verifyTokenToRestorePassword], authCtrl.verifyTokenToRestorePassword)
router.put('/updatePassword/:id', authCtrl.updatePassword)
router.put('/changePassword/:id',[authjwt.verifyToken], authCtrl.updatePassword)


export default router