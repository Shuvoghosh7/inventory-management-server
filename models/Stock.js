const mongoose = require("mongoose");
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types

const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name:String,
    description: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "liter", "pcs", "bag"],
            massage: "Unit value can't be {VALUE},must be kg/liter/pcs",
        }
    },
    imageUrl: [{
        type: String,
        required: true,
        validate: [validator.isURL , "Plese Provide valid URL"]
    }],
    price: {
        type: Number,
        require: true,
        min: [0, "product price can not Nagative"]
    },
    quantity: {
        type: Number,
        require: true,
        min: [0, "product quantity can not Nagative"]
    },
    category: {
        type: String,
        require: true,
    },
    brand: {
        name: {
            type: String,
            require: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            require: true,
        },
    },
    store: {
        name: {
            type: String,
            trim: true,
            require: true,
            enum: {
                values: ["Dhaka", "Chattogam", "Rajshahi", "sylhet", "khulna", "barisal", "Rangpur", "Mymensingh"],
                message: "{VALUE} is not valid name"
            }
        },
        id: {
            type: ObjectId,
            require: true,
            ref: "Store"
        }
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            massage: 'status can not be {VALUE}'
        }
    },
    suppliedBy:{
        name:{
            type: String,
            trim: true,
            require: true,
            lowercase: true,
        },
        id: {
            type: ObjectId,
            require: true,
            ref: "Supplier"
        }  
    },
    sellCount:{
        type:Number,
        default:0,
        min:0
    }
}, {
    timestamps: true
})

const Stock = mongoose.model("Stock", stockSchema)

module.exports = Stock;