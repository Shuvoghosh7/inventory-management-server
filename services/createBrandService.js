const Brand = require("../models/Brand");


exports.createBrandService = async (data) => {
    const result = await Brand.create(data)
    return result;
}
exports.getBrandService = async () => {
    const brands = await Brand.find({}).select('-products -suppliers')
    return brands;
}
exports.getBrandByIdService = async (id) => {
    const drand = await Brand.findOne({_id:id})
    return drand;
}
exports.updateBrandService = async (id,data) => {
    const result = await Brand.updateOne({_id:id},data,{
        runValidators:true
    })
    return result;
}
