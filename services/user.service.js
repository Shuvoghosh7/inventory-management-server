const User = require("../models/User");


exports.createUserService = async (userInfo) => {
    const catagory = await User.create(userInfo)
    return catagory;
}

exports.getUserByEmail=async(email)=>{
    return await User.findOne({email})
}