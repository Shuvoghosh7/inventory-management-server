const { ObjectID } = require("bson");
const mongoose = require("mongoose");

//schema design
const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please provide a name for thid product"],
      trim: true,
      lowercase:true,
      unique: [true, "Name must be Unique"],
      minLength: [3, "Name mast be 3 characters"],
      maxLength: [100, "Name is too larges"],
    },
    description: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs","bag"],
        massage: "Unit value can't be {VALUE},must be kg/liter/pcs",
      }
    },
    imageUrl:[{
      type:String,
      required: true,
      validate:{
        validator:(value)=>{
          if(!Array.isArray(value)){
            return false;
          }
          let isValid=true;
          value.forEach(url =>{
            if(!validator.isURL(url)){
              isValid.false;
            }
          });
          return isValid;
        },
        massage: "Plese provide valid image url"
      }
    }],
    category:{
      type:String,
      require:true,
    },
    brand:{
      name:{
        type:String,
        require:true,
      },
      id:{
        type:ObjectID,
        ref:"Brand",
        require:true,
      }
    }
    /* createdAt:{
      type:Date,
      default:Date.now,
    },
    updatedAt:{
      type:Date,
      default:Date.now,
    } */
  }, {
    timestamps: true
  })
  //mongoos middlewares for saving data: pre/post
  productSchema.pre('save',function(next){
    console.log("Before saving Data")
    if(this.quantity == 0){
      this.stauts="out-of-stock"
    }
    next()
  })
  
  /* productSchema.post('save',function(doc,next){
    console.log("After saving Data")
    next()
  }) */
  
  productSchema.methods.logger=function(){
    console.log(`Data save for ${this.name}`)
  }
  
  //SCHEMA-MODEL-QUERY
  
  //model
  const Products = mongoose.model('Products', productSchema)

  module.exports=Products;