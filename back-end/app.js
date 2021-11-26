 import express, { json } from 'express'
 const cors = require ( 'cors' )
 const bodyParser = require ( 'body-parser' )
 import morgan from 'morgan'

 
 // Importing Routes
 import employers from './routers/employers.routes'
 import employees from './routers/employees.routes'
 import beneficiaries from './routers/beneficiaries.routes'
 import authRoutes from './routers/auth.routes'
 import users from './routers/users.routes'
 import roles from './routers/roles.routes'
 import relatedTables from './routers/related-tables.routes'
 

 // Initializations
 
 const app = express();
 app.use(cors())
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))


 //midelwares
 app.use(morgan('dev'));
 app.use(json());

 // routes
 app.use('/api/employers', employers)
 app.use('/api/employees', employees)
 app.use('/api/beneficiaries', beneficiaries)
 app.use('/api/relatedTables', relatedTables)
 app.use('/api/auth', authRoutes)
 app.use('/api/users', users)
 app.use('/api/roles', roles)
 

 

 export default app;
