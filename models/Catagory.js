const mongoose = require("mongoose");
const validator = require('validator');
const{objectId}=mongoose.Schema.Types

const catagorySchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        unique:[true,"Plese Provide a Catagory Name"],
        lowercase:true
    },
    description:String,
    imageURL:{
        type:String,
        validator:[validator.isURL,"Plese provide a valid url"]
    }  
},{
    timestamps: true
})

const Catagory=mongoose.model("Catagory",catagorySchema)

module.exports=Catagory;