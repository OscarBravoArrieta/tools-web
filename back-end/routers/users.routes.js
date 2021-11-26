 import { Router } from 'express'
 const router = Router() 
 import * as users from '../controllers/users.controller'

 router.get('/', users.getAll)
 
 export default router