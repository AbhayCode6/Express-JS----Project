const express = require('express')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,'./uploads')
    },
    filename : function (re,file,cb){
        const id = Date.now()
        cb(null, file.fieldname + '-' + id + path.extname(file.originalname))
    }
})
const upload = multer({storage : storage})

const app = express()

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.post('/submit',upload.single('Document'),(req,res)=>{
    res.send("File Uploaded..")
    console.log(req.body)
    console.log(req.file)
})



// Html part//

/* 
 <h1> FILE UPLOAD (MULTER) </h1>
    <form action="/submit" method="post" enctype="multipart/form-data">
        <input type="file" name="Document" >
        <button type="submit">Upload</button>
    </form>
*/

