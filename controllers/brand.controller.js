const { createBrandService, getBrandService, getBrandByIdService, updateBrandService } = require("../services/createBrandService")


exports.createBrand=async (req, res, next) => {
    try {
      //create method
      const result=await createBrandService(req.body)
  
      res.status(200).json({
        stauts: "success",
        massage: "successfully create a brand",
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
exports.getBrand=async (req, res, next) => {
    try {
      //create method
      const brands=await getBrandService(req.body);
  
      res.status(200).json({
        stauts: "success",
        massage: "successfully get data for brand",
        data: brands
      })
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Data is not found",
        error : error.message
      })
  
    }
    
  }
exports.getBrandById=async (req, res, next) => {
    const {id}=req.params;
    try {
      //create method
      const brand=await getBrandByIdService(id);
      if(!brand){
        return res.status(400).json({
            stauts:"fail",
            error : "Could not finds a brand with this id"
          })
      }
      res.status(200).json({
        stauts: "success",
        massage: "successfully create a brand",
        data: brand
      })
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Data is not inserted",
        error : error.message
      })
  
    }
    
  }
exports.updateBrand=async (req, res, next) => {
    const {id}=req.params;
    try {
      //create method
      const result =await updateBrandService(id,req.body);
      if(!result.modifiedCount){
        return res.status(400).json({
            stauts:"fail",
            error : "Could not drand a brand with this id"
          })
      }
      res.status(200).json({
        stauts: "success",
        massage: "successfully update the brand",
      })
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Could not update",
        error : error.message
      })
  
    }
    
  }