 import { Router } from 'express'
 const router = Router() 
 import * as multiPart from '../middlewares/flat_files'
 import * as flatFiles from '../controllers/flat_files.controller'

 router.post('/', [multiPart.multiPartMiddleware], flatFiles.flat_files)

 export default router