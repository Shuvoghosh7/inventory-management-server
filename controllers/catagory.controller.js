const { createCatagoryService, getCatagoryService } = require("../services/catagory.service")



exports.createCatagory=async (req, res, next) => {
    try {
      //create method
      const result=await createCatagoryService()
  
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
exports.getCatagory=async (req, res, next) => {
    try {
      //create method
      const brands=await getCatagoryService();
  
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
