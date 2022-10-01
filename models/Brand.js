const mongoose = require("mongoose");
const validator = require('validator');
const{ObjectId}=mongoose.Schema.Types

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
        type:ObjectId,
        ref:"Product"
    }],
    suppliers:[{
        name:String,
        conttactNumber:String,
        id:{
            type:ObjectId,
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


const Brands = mongoose.model('Brands', brandSchema);

module.exports=Brands;