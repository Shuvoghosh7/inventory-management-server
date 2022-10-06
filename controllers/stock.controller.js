const { createStockService, getStockctsService, getStockByIdService } = require("../services/stock.service")


exports.getStock=async(req,res,next)=>{
    try {

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


      const product=await getStockctsService(filters,queries);
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

exports.createStock=async (req, res, next) => {
    try {
      //create method
      const result=await createStockService(req.body)
  
      res.status(200).json({
        stauts: "success",
        massage: "successfully create a Stock",
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

  exports.getStockById=async (req, res, next) => {
    try {
        const {id}=req.params;
        const stock=await getStockByIdService(id)

        if(!stock){
            return res.status(400).json({
              stauts: "fail",
              error: "Could not find stock this id ",
            })
          }
          res.status(200).json({
            stauts: "success",
            data:stock
          })
        
    } catch (error) {
        res.status(400).json({
            stauts:"fail",
            message: "Data is not Get by ID",
            error : error.message
          })
    }
  }