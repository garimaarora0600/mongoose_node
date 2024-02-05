const mongoose=require('mongoose');
const DetailsSch=new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:String,
    email:String,
    dialCode:String,
    phone:String,
});


const Details=mongoose.model('details',DetailsSch);
module.exports=Details;