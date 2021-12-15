import { Router } from 'express'
const router = Router()
import * as verifySignUp from '../middlewares/verifySignUp'
import * as authCtrl from '../controllers/auth.controller'
import * as authjwt from '../middlewares/authjwt'

router.post('/getDataForUser', [verifySignUp.userFound], authCtrl.getDataForUser)
router.post('/signup', [verifySignUp.userFound], authCtrl.signUp)
router.get('/verifyTokenFromEmail/:token', [authjwt.verifyTokenFromEmail], authCtrl.verifyTokenFromEmail)
router.post('/signin', authCtrl.signIn)

export default router