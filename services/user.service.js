const User = require("../models/User");


exports.createUserService = async (userInfo) => {
    const catagory = await User.create(userInfo)
    return catagory;
}