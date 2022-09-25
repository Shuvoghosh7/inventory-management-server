const mongoose = require("mongoose");
const validator = require('validator');
const{objectId}=mongoose.Schema.Types

const brandSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        unique:[true,"Plese Provide Brand Name"],
        maxLength:100,
        lowercase:true
    },
    description:String,
    email:{
        type:String,
        lowercase:true,
        validator:[validator.isEmail,"Plese provide a valid Email"]
    },
    website:{
        type:String,
        validator:[validator.isURL,"Plese provide a valid url"]
    },
    location:String,
    products:[{
        type:objectId,
        ref:"product",//this object ID come product model
    }],
    suppliers:[{
        name:String,
        conttactNumber:String,
        id:{
            type:objectId,
            ref:"supplier"
        }
    }],
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }   
},{
    timestamps: true
})

const Brand=mongoose.model("Brand",brandSchema)

module.exports=Brand;