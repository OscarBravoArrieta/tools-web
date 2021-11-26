 import { Router } from 'express'
 const router = Router() 
 import * as roles from '../controllers/roles.controller'

 router.get('/', roles.getAll)

 export default router