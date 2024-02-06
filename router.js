// const express = require('express');
// require('./config')
// const Details = require('./databases/details_Sch_Mod');
// const detail=require('./databases/marks_Sch_Mod')
// const app = express();
// app.use(express.json());
const express=require('express')
// const app=express();
// app.use(express.json());
require('../config');
const Details=require('../databases/details_Sch_Mod');
const detail=require('../databases/marks_Sch_Mod')
const validationSchema = require('../validations_joi/validation')
const putValidation=require('../validations_joi/put_validation')
//jwt
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const saltRounds=10
// const router=express.Router();
// router.get('/list', async (req, res) => {
module.exports.getapi= async (req, res) => {
    try {
        let data = await Details.find();
        return res.send(data);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
};



// get the data using id as param
// router.get('/:_id', async (req, res) => {
module.exports.getuser=async (req, res) => {
    try { // console.log(req.params);
        // res.send("done!!");
        let data = await Details.find(req.params);
        return res.send(data);
        console.log(data);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};

// router.post('/create', async (req, res) => {
    module.exports.postapi=async (req, res) => {
// res.send("done");
    // need to parse the body so use app.use(express.json());
    try {
        await validationSchema.validateAsync(req.body);
        console.log(req.body);
        //to store in database
        // let data = new Details(req.body);
        // save the data
        let result = await Details.create(req.body);
        return res.send(result);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
}

// add marks and subjects with params id
// app.put('/update/subMarks/:_id', async (req, res) => {
//     try {
//         await validationSchema.validateAsync(req.body);
//         // console.log(req.params);
//         let data = await Details.updateOne(
//             req.params,
//             {
//                 $set:req.body
//             }            
//         )
//         return res.send(data);
//     }
//     catch (error) {
//         return res.status(400).send(error.message);
//     }
// })
// router.post('/marks/:_id',async(req,res)=>{
    module.exports.postapim= async (req, res) => {
try {
    // await putValidation
        let data=await detail.create(
            {
                subject:req.body.subject,
                marks:req.body.marks
            }
        )
        return res.send(data); 
    } catch (error) {
        return res.status(404).send(error.message);
    }
}
// router.put("/update/:_id", async (req, res) => 
module.exports.putapi= async (req, res) => {
    // console.log(req.params)
    try {
        await putValidation.validateAsync(req.body);
        let data = await Details.updateOne(
            req.params,
            {
                $set: req.body
            }
        );
        return res.send(data);
        // console.log(req.params);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};

// router.delete("/delete/:_id", async (req, res) => {
module.exports.deleteapi=async (req, res) => {
    try {
        console.log(req.params);
        let data = await Details.deleteOne(req.params);
        // res.send("done!!");
        return res.send(data);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
// module.exports=router;


// user registration(jwt implementation)
const secretKey="secretkey";


module.exports.userreg=async(req,res)=>{
    // validate email 
    // const user=req.params'
    console.log("hhh")
    let email=req.body.email;
    let pwd=req.body.password;
    let existingUser=await Details.findOne({email:email});
    console.log(existingUser)
    console.log("hhhh")
    if(existingUser){
        // console.log("gg")
        const pw=existingUser.password
        // console.log(pw)
        let matchpwd=await bcrypt.compare(pwd,pw);
        // console.log(matchpwd)
        if(matchpwd){
            const Userid=existingUser._id
            jwt.sign({userid:Userid},secretKey,{expiresIn:'300s'},(err,token)=>{
                res.json({
                    token
                })
                // res.send(token);
            })
        }
    }else{
        return res.status(404).send("email not found!!")
    }

    }
    
// module.exports.posttoken=(req,res)=>{
module.exports.verify = async(req,res)=>{
        jwt.verify(req.token,secretKey,async(err,authData)=>{
            if(err){
                res.send({result:"invalid token"})
            }else{
                // res.json({
                //     message:"profile accessed",
                //     let data=await Details.find(authData)
                // })
                let data=await Details.findOne({_id:authData.userid});
                res.send(data);
            }
        })
    };

module.exports.verifyToken = async(req,res,next) => {
    const bearerHeader= req.headers['authorization'];
    if(typeof bearerHeader!== 'undefined'){
       const bearer=bearerHeader.split(" ");
       const token=bearer[1];
       req.token=token;
       next();

}
}

// for password
module.exports.postpwd=async(req,res)=>{
    let password=req.body.password;
    let hashPwd=await bcrypt.hash(password,saltRounds);
    let data=await Details.create({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:hashPwd,
        dialCode:req.body.dialCode,
        phone:req.body.phone
    });
    return res.send(data);
}

   