const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(cors());
//routes
const productRoute=require('./routes/product.route')
const brandRoute=require('./routes/brand.route')
const storeRoute=require("./routes/store.route")
const catagoryRoute=require("./routes/catagory.route")
const supplierRoute=require("./routes/supplier.route")
const stockRoute=require("./routes/stock.Route")



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// route colling
app.use("/api/v1/product",productRoute)
app.use("/api/v1/brands",brandRoute)
app.use("/api/v1/store",storeRoute)
app.use("/api/v1/catagory",catagoryRoute) 
app.use("/api/v1/supplier",supplierRoute) 
app.use("/api/v1/stock",stockRoute) 


module.exports = app;
