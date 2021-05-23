// Imports
const express = require('express');
const serverless = require('serverless-http');
const fileUpload = require("express-fileupload");

const app = express();
const router = express.Router();

app.use(fileUpload({
  limits: { fileSize: 500 * 1024 * 1024 }
}));

router.get('/', (req, res) => {
  res.send("Plant Buy Shop.\n\nLoading... 1234");
});

router.post('/uploadImage', async (req,res) => {

  try {

    if( !req.files.uploadFile ){
      return res.json({
        error: "No File Uploaded."
      })
    }
  
    const fileDetail = {
      ...req.files.uploadFile,
    }
  
    delete fileDetail.data
    
    return res.json({
      fileDetail
    })

  } catch (error) {
    console.log(error)
    return res.json({
      error
    })
  }

})

app.use('/.netlify/functions/api', router);  // path must route to lambda

console.log('http://localhost:9000/.netlify/functions/api')

module.exports.handler = serverless(app);