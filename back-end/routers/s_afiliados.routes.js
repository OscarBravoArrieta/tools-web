 import { Router } from 'express'
 const router = Router()
 import * as afiliadosCtrl from '../controllers/s_afiliados.controller'
 //router.get('/', afiliadosCtrl.getAll)

 router.post('/', afiliadosCtrl.getAll)

 export default router