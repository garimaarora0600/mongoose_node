const express=require('express');
const  router  = require('./route/user');
// const UserRouter=require('./route/router');
console.log("hello")
// const UserRouter = require('./route/user');

const app=express();
app.use(express.json());
app.use('/',router);

app.listen(3000,()=>{
    require('./config');
})
// app.listen()