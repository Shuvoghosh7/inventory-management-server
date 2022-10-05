const express = require("express");
const router=express.Router()

const supplierController=require('../controllers/supplierController')


router.route('/')
.post(supplierController.createSupplier)
.get(supplierController.getSupplier)
router.route('/:id')
.get(supplierController.getSupplierById)
.patch(supplierController.updateSupplier)

module.exports=router;