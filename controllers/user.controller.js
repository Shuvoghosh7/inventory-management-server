const { createUserService } = require("../services/user.service")


exports.singup=async (req, res, next) => {
    try {
        const result=await createUserService(req.body)
  
      res.status(200).json({
        stauts: "success",
        massage: "successfully create a new user",
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