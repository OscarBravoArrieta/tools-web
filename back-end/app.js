 import express, { json } from 'express'
 const cors = require ( 'cors' )
 const bodyParser = require ( 'body-parser' )
 import morgan from 'morgan'
 const path = require('path')
  
 
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

 app.use('/', express.static('app-tools', {redirect: false}))
 app.use('/api/employers', employers)
 app.use('/api/employees', employees)
 app.use('/api/beneficiaries', beneficiaries)
 app.use('/api/relatedTables', relatedTables)
 app.use('/api/auth', authRoutes)
 app.use('/api/users', users)
 app.use('/api/roles', roles)
 app.get('*', function(req, res, next){
     return res.sendFile(path.resolve('app-tools/index.html'))
 })


 
 //console.log('Aleatorio: ',cryptoRandomString({length: 10}))
 

 export default app;
