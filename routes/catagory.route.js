const express = require("express");
const router=express.Router()
const catagoryController=require('../controllers/catagory.controller')

router.route('/')
.get(catagoryController.getCatagory)
.post(catagoryController.createCatagory)

 module.exports=router;