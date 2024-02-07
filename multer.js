const express=require('express')
const multer=require('multer')
const upload=multer({dest:'uploads/'})

const app=express();

//upload.single('avatar') is a middleware
app.post('/api/upload',upload.single('avatar'),(req,res)=>{
    res.send("upload successfully!!");
})

app.listen(3000);