const mongoose = require("mongoose");
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for thid product"],
        trim: true,
        lowercase: true,
        unique: [true, "Name must be Unique"],
        minLength: [3, "Name mast be 3 characters"],
        maxLength: [100, "Name is too larges"],
    },
    email:{
        type:String,
        lowercase:true,
        validator:[validator.isEmail,"Plese provide a valid Email"]
    },
    brand:{
        name:{
          type:String,
          trim:true,
          require:true,
        },
        id:{
          type:ObjectId,
          ref:"Brand",
          require:true,
        }
      },
      contactNumber:[{
        type:String,
        required: [true, "Please provide a contuct Number"],
        validate:{
            validator:(value)=>{
                return validator.isMobilePhone(value);
            },
            massage:"Please provide a valid phone number"
        }
      }],
      emergencyContactNumber:{
        type:String,
        required: [true, "Please provide a emergency Contact Number"],
        validate:{
            validator:(value)=>{
                return validator.isMobilePhone(value);
            },
            massage:"Please provide a valid phone number"
        }
      },
      tradeLicenseNumber:{
        type:Number,
        required: [true, "Please provide your trade License  Number"],
      },
      presentAddress:{
        type:String,
        required: [true, "Please provide your present Address"]
      },
      parmanentAddress:{
        type:String,
        required: [true, "Please provide your parmanent Address"]
      },
      location:{
        type:String,
        require:true,
        enum:{
            values:["Dhaka","Chattogam","Rajshahi","sylhet","khulna","barisal","Rangpur","Mymensingh"],
            message:"{VALUE} is not valid name"
        }
      },
      imageUrl:{
        type:String,
        validator:[validator.isURL,"Plese provide a valid image URL"]
      },
      nationalIdImageUrl:{
        type:String,
        validator:[validator.isURL,"Plese provide a valid national Id Image Url"]
      },
      status:{
        type:String,
        enum:["active","inactive"],
    },
   
},{
    timestamps: true
})

const Supplier=mongoose.model('Supplier', supplierSchema);

module.exports=Supplier;