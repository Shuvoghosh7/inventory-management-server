const mongoose = require("mongoose");
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types

const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name: {
        type: String,
        required: [true, "Please provide a name for thid product"],
        trim: true,
        lowercase: true,
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
            values: ["kg", "liter", "pcs", "bag"],
            massage: "Unit value can't be {VALUE},must be kg/liter/pcs",
        }
    },
    imageUrl: [{
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                if (!Array.isArray(value)) {
                    return false;
                }
                let isValid = true;
                value.forEach(url => {
                    if (!validator.isURL(url)) {
                        isValid.false;
                    }
                });
                return isValid;
            },
            massage: "Plese provide valid image url"
        }
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
    status: {
        type: String,
        require: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            massage: 'status can not be {VALUE}'
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            require: true,
            lowercase: true,
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
    }
}, {
    timestamps: true
})

const Stock = mongoose.model("Stock", stockSchema)

module.exports = Stock;