const express = require("express");
const router=express.Router()
const productController=require('../controllers/product.controller');
const uploader = require("../middlewar/uploder");


router.route('/file-upload')
.post(uploader.array('image'), productController.fileUpload)

router.route('/bulk-update')
.patch(productController.bulkUpdateProduct)
router.route('/bulk-delete')
.delete(productController.bulkDeleteProduct)

router.route('/')
.get(productController.getController)
.post(productController.createProduct)
router.route('/:id')
.patch(productController.updateProduct)
.delete(productController.deleteProduct)

module.exports=router;