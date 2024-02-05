const mongoose=require('mongoose');
const MarksSch=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DetailsSch'
    },
    marks:String,
    subject:String
})
const detail1 =mongoose.model('detail1',MarksSch);
module.exports=detail1