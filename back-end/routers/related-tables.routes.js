import { Router } from 'express'
const router = Router() 
import * as relatedTables from '../controllers/related-tables.controller'

router.put('/reason-for-inactivation', relatedTables.getAllReasonForInactivation)
 
export default router