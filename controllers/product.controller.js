const Products=require('../models/Product')


exports.getController=async(req,res,next)=>{
    try {
      /* const products=await Products
      .where("name").equals(/\w/)
      .where("quantity").gt(2).lt(110)
      .limit(2).sort({quantity:-1}) */
  
      //find by id
      const product=await Products.find({})
      
  
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
      const result=await Products.create(req.body)
  
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