 import app from './app'
 require('dotenv').config()
 const PORT =  process.env.PORT || 8600

 async function main(){
     await app.listen(PORT)
     console.log(`Server on port ${PORT}...` )
 }

 main()