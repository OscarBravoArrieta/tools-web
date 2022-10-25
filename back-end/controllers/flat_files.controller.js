//  const multipart = require('connect-multiparty')
//  const multiPartMiddleware = multipart({
//      uploadDir: './uploaded_files/flat_files'
//  })

 export  async function flat_files(req, res) {
     res.json({
         'message': 'File has been uploaded succefull...'
     })

 }