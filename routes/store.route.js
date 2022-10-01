const express = require("express");
const router=express.Router()
const stroeController=require('../controllers/store.controller')
router.route('/')
.post(stroeController.createStore)
.get(stroeController.getStore)
router.route('/:id')
.get(stroeController.getStoreById)

module.exports=router;