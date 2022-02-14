 import app from './app'
 require('dotenv').config()
 const PORT =  process.env.PORT || 8600
 const hostname = process.env.APP_URL || 'localhost';

 async function main(){
     await app.listen(PORT, hostname)
     console.log(`Server running at http://${hostname}:${PORT}...` )     
 }
 main()