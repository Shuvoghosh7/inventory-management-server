const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(cors());

//schema design
const productSchema=mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please provide a name for thid product"],
    trim:true,
    unique:[true,"Name must be Unique"],
    minLength:[3,"Name mast be 3 characters"],
    maxLength:[100,"Name is too larges"],
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true,
    min:[0,"Price can't be negative"]
  },
  unit:{
    type:String,
    required:true,
    enum:{
      values:["kg","liter","pcs"],
      massage:"Unit value can't be {VALUE},must be kg/liter/pcs",
    }
  },
  quantity:{
    type:Number,
    required:true,
    min:[0,"quantity can't be negative"],
    validate:{
      validator:(value)=>{
        const isInteger = Number.isInteger(value);
        if(isInteger){
          return true
        }else{
          return false
        }
      }
    },
    massage:"Quentuty must be integer"
  },
  stauts:{
    type:String,
    required:true,
    enum:{
      values:["in-stock","out-of-stock","discontinued"],
      massage:"stauts value can't be {VALUE}",
    },

  },
  /* createdAt:{
    type:Date,
    default:Date.now,
  },
  updatedAt:{
    type:Date,
    default:Date.now,
  } */
  //referance way connect another collection
  supplier:{
    type:mongoose.Schema.types.ObjectId,
    ref:"Supplier"
  },
  categories:[{
    name:{
      type:String,
      required:true,
    },
    _id:mongoose.Schema.types.ObjectId,
  }]
},{
  timestamps:true
})

//SCHEMA-NODEL-QUERY

//model
const Products=mongoose.model('Products',productSchema)

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//postind database
app.post("api/v1/product",(req,res,next)=>{
  res.send("it is working")
})

module.exports = app;
