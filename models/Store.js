const mongoose = require("mongoose");
const validator = require('validator');
const {objectId} =mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        enum:{
            values:["Dhaka","Chattogam","Rajshahi","sylhet","khulna","barisal","Rangpur","Mymensingh"],
            message:"{VALUE} is not valid name"
        }
    },
    description:String,
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    /* manager:[{
        name:String,
        conttactNumber:String,
        id:{
            type:objectId,
            ref:"User"
        }
    }] */
     
},{
    timestamps: true
})

const Store=mongoose.model("Store",storeSchema )

module.exports=Store;