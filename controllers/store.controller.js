const { getStoreService, createStoreService, getStoreByIdService } = require("../services/store.service")

exports.createStore=async (req, res, next) => {
    try {
      //create method
      const result=await createStoreService()
  
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
exports.getStore=async (req, res, next) => {
    try {
      //create method
      const brands=await getStoreService();
  
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
exports.getStoreById=async (req, res, next) => {
    const {id}=req.params;
    try {
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