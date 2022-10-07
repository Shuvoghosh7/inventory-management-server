const express = require("express");
const router=express.Router()
const userController=require('../controllers/user.controller')

router.post('/singpu',userController.singup)

module.exports=router;