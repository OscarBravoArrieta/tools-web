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
 app.get('/', (req, res) => {
     res.send(`<h1>Server is running on port 4000...</h1>
               <h2>Server is running on port 4000...</h2>
               <h3>Server is running on port 4000...</h3>
               <h4>Server is running on port 4000...</h4>
               <h5>Server is running on port 4000...</h5>`)
 })
 app.use('/api/employers', employers)
 app.use('/api/employees', employees)
 app.use('/api/beneficiaries', beneficiaries)
 app.use('/api/relatedTables', relatedTables)
 app.use('/api/auth', authRoutes)
 app.use('/api/users', users)
 app.use('/api/roles', roles)
 
 //console.log('Aleatorio: ',cryptoRandomString({length: 10}))
 

 export default app;
