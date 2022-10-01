const Catagory = require("../models/Catagory");

exports.createCatagoryService = async (data) => {
    const catagory = await Catagory.create(data)
    return catagory;
}
exports.getCatagoryService = async () => {
    const catagory = await Catagory.find({})
    return catagory;
}
