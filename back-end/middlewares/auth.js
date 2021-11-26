 import bcrypt from 'bcryptjs'
 //------------------------------------------------------------------------------------------------
 export const encryptedPassword = async () => {
     const salt = await bcrypt.genSalt(10) // Invocar el método gensSaltm para encriptar un número de veces
     return await bcrypt.hash(password, salt)
 }
 //------------------------------------------------------------------------------------------------
 export const passwordMatches = async () => {
     return await bcrypt.compare(password, receivedPassword)  
 }
 //------------------------------------------------------------------------------------------------
