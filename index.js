const express=require('express');
const mongoose=require('mongoose')
const UserRouter=require('./router');
const app=express();
app.use(express.json());
app.use('/',UserRouter);

app.listen(3000,()=>{
    require('./config');
})