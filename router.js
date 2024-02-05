// const express = require('express');
// require('./config')
// const Details = require('./databases/details_Sch_Mod');
// const detail=require('./databases/marks_Sch_Mod')
// const app = express();
// app.use(express.json());
const express=require('express')
const app=express()

const validationSchema = require('./validations_joi/validation')
const putValidation=require('./validations_joi/put_validation')

app.get('/list', async (req, res) => {
    try {
        let data = await Details.find();
        return res.send(data);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});



// get the data using id as param
app.get('/:_id', async (req, res) => {
    try { // console.log(req.params);
        // res.send("done!!");
        let data = await Details.find(req.params);
        return res.send(data);
        console.log(data);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});

app.post('/create', async (req, res) => {
    // res.send("done");
    // need to parse the body so use app.use(express.json());
    try {
        await validationSchema.validateAsync(req.body);
        console.log(req.body);
        //to store in database
        // let data = new Details(req.body);
        // save the data
        let result = await data.create(req.body);
        return res.send(result);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
})

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
app.post('/marks/:_id',async(req,res)=>{
    try {
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
})
app.put("/update/:_id", async (req, res) => {
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
});

app.delete("/delete/:_id", async (req, res) => {
    try {
        console.log(req.params);
        let data = await Details.deleteOne(req.params);
        // res.send("done!!");
        return res.send(data);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});
module.exports=app
