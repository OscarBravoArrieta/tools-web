 const multipart = require('connect-multiparty')

 export const multiPartMiddleware = multipart({
     uploadDir: './uploaded_files/flat_files'
 })