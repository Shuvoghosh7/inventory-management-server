const Products=require('../models/Product')

const { getProductsService, createProductService, updateProductService, bulkUpdateProductService, deleteProductService, bulkDeleteProductService } = require("../services/product.services")

exports.getController=async(req,res,next)=>{
    try {
      /* const products=await Products
      .where("name").equals(/\w/)
      .where("quantity").gt(2).lt(110)
      .limit(2).sort({quantity:-1}) */
  
      //find by id
      let filters={...req.query}
      //solt,page,limit, --- exclude
      const excludeField=['sort','page','limit']
      excludeField.forEach(field =>delete filters[field])
     
      //gt,li,get,lte
      let filterString=JSON.stringify(filters)
      filterString=filterString.replace(/\b(gt|gte|lt|Lte)\b/g, match => `$${match}`)

      filters=JSON.parse(filterString)
      console.log(JSON.parse(filterString))

      
      const queries={}
      if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ')
        queries.sortBy=sortBy
      }
//
      if(req.query.fields){
        const fields=req.query.fields.split(',').join(' ')
        queries.fields=fields
        console.log(fields)
      }
  //Pagination
      if(req.query.page){
        const{page=1,limit=10}=req.query;
        const skip=(page-1)*parseInt(limit);
        queries.skip=skip;
        queries.limit=parseInt(limit);
      }


      const product=await getProductsService(filters,queries);
      res.status(200).json({
        status:"success",
        data:product 
      })
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Cant not get data",
        error : error.message
      })
    }
  }

  exports.createProduct=async (req, res, next) => {
    try {
      /* //save method
      const product = new Products(req.body)
      //instance creation => do something => save()
      if(product.quantity == 0){
        product.stauts="out-of-stock"
      }
      const result = await product.save() */
     
  
      //create method
      const result=await createProductService(req.body)
  
      res.status(200).json({
        stauts: "success",
        massage: "Data inside successfully",
        data: result
      })
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Data is not inserted",
        error : error.message
      })
  
    }
    
  }

exports.updateProduct=async(req,res,next)=>{
    try {
      const {id}=req.params;
      const result=await updateProductService(id,req.body)
      res.status(200).json({
        stauts: "success",
        massage: "Data Update successfully",
        data: result
      })
      
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Product is not update",
        error : error.message
      })
    }

  }

  exports.bulkUpdateProduct=async(req,res,next)=>{
    try {
      const result=await bulkUpdateProductService(req.body)
      res.status(200).json({
        stauts: "success",
        massage: "Data Update successfully",
        data: result
      })
      
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Product is not update",
        error : error.message
      })
    }

  }

  exports.deleteProduct=async(req,res,next)=>{
    try {
      const {id}=req.params;
      const result=await deleteProductService(id)
      if(!result.deletedCount){
        return res.status({
          stauts: "fail",
          error: "Could not delete the product",
        })
      }
      res.status(200).json({
        stauts: "success",
        massage: "Data Update successfully",
      })
      
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Product is not update",
        error : error.message
      })
    }

  }

  exports.bulkDeleteProduct=async(req,res,next)=>{
    try {
      const result=await bulkDeleteProductService(req.body.ids)
      res.status(200).json({
        stauts: "success",
        massage: "Delete multipl produts successfully",
        data: result
      })
      
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Delete multipl produts not successfully",
        error : error.message
      })
    }

  }