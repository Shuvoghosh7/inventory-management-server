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



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// route colling
app.use("/api/v1/product",productRoute)
app.use("/api/v1/brands",brandRoute)
app.use("/api/v1/store",storeRoute)
app.use("/api/v1/catagory",catagoryRoute) 


module.exports = app;
