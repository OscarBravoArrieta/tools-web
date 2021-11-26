import { Router } from 'express'
const router = Router()
import * as gener18Ctrl from '../controllers/gener18.controller'
router.get('/', gener18Ctrl.getAllGener18 )

export default router