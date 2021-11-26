import { Router } from 'express'
const router = Router()

import * as authCtrl from '../controllers/auth.controller'

//import * as authCtrl from '../controllers/auth.controller'
//import { verifySignUp } from  '../middlewares/verifySignUp'

//router.post('/signup', [verifySignUp.checkDuplicteUsernameOrEmail, verifySignUp.checkRolesExist], authCtrl.signUp)
//router.post('/signin', authCtrl.signIn)
router.post('/getDataForUser', authCtrl.getDataForUser)
router.post('/signup', authCtrl.signUp)
router.post('/signin', authCtrl.signIn)



export default router