const { createUserService, getUserByEmail } = require("../services/user.service")
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/token");

exports.singup = async (req, res, next) => {
  try {
    const result = await createUserService(req.body)

    res.status(200).json({
      stauts: "success",
      massage: "successfully create a new user",
      data: result
    })
  } catch (error) {
    res.status(400).json({
      stauts: "fail",
      message: "Data is not inserted",
      error: error.message
    })
  }
}
/* step for login 
1. Check if Email and password are given
2.Load user with email
3.if not user send res
4.compare password
5.if password not correct send res
6.check if user is active
7.if not active send res
8.generate token
9.send user and token */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1. Check if Email and password are given
    if (!email || !password) {
      return res.status(401).json({
        stauts: "fail",
        error: "please provide your credaentials",
      })
    }
    // 2.Load user with email
    const user=await getUserByEmail(email)
    // 3.if not user send res
    if(!user){
      return res.status(401).json({
        stauts: "fail",
        error: "user not found.Please create account",
      })
    }
    // 4.compare password
/*     const isPasswordValid=bcrypt.compareSync    (password,user.password) */
    
    const isPasswordValid=user.comparePassword(password,user.password)
    
    // 5.if password not correct send res
    if(!isPasswordValid){
      return res.status(403).json({
        stauts: "fail",
        error: "password is not correct",
      })
    }
    // 6,7.check if user is active
    if(user.status != "active"){
      return res.status(401).json({
        stauts: "fail",
        error: "Your Account is not active",
      })
    }
    // 8.generate token
    const token= generateToken(user)
    
    //send without password
    const{password:pws,...others}=user.toObject();

    // 9.send user and token
    res.status(200).json({
      stauts: "success",
      massage: "successfully login in",
      data: {
        user:others,
        token
      }
    })
  } catch (error) {
    res.status(400).json({
      stauts: "fail",
      message: "Data is not inserted",
      error: error.message
    })
  }
}