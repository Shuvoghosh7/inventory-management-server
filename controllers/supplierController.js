const { updateSupplierService, getSupplierService, createSupplierService, getSupplierByIdService } = require("../services/supplier.service")


exports.createSupplier=async (req, res, next) => {
    try {
      //create method
      const result=await createSupplierService(req.body)
  
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
exports.getSupplier=async (req, res, next) => {
    try {
      //create method
      const supplier=await getSupplierService();
  
      res.status(200).json({
        stauts: "success",
        massage: "successfully get data for supplier",
        data: supplier
      })
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Data is not found",
        error : error.message
      })
  
    }
    
  }
  exports.getSupplierById=async (req, res, next) => {
    const {id}=req.params;
    try {
      //create method
      const supplier=await getSupplierByIdService(id);
      if(!supplier){
        return res.status(400).json({
            stauts:"fail",
            error : "Could not finds a supplier with this id"
          })
      }
      res.status(200).json({
        stauts: "success",
        massage: "successfully create a supplier",
        data: supplier
      })
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Data is not inserted",
        error : error.message
      })
  
    }
    
  }
  exports.updateSupplier=async (req, res, next) => {
    const {id}=req.params;
    try {
      //create method
      const result =await updateSupplierService(id,req.body);
      if(!result.modifiedCount){
        return res.status(400).json({
            stauts:"fail",
            error : "Could not update a supplier with this id"
          })
      }
      res.status(200).json({
        stauts: "success",
        massage: "successfully update the supplier",
      })
    } catch (error) {
      res.status(400).json({
        stauts:"fail",
        message: "Could not update",
        error : error.message
      })
  
    }
    
  }