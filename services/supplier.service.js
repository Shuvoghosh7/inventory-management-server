const  Supplier = require("../models/supplier");


exports.createSupplierService = async (data) => {
    const result = await Supplier.create(data)
    return result;
}
exports.getSupplierService = async () => {
    const brands = await Supplier.find({}).select('-products -suppliers')
    return brands;
}
exports.getSupplierByIdService = async (id) => {
    const drand = await Supplier.findOne({_id:id})
    return drand;
}
exports.updateSupplierService = async (id,data) => {
    const result = await Supplier.updateOne({_id:id},data,{
        runValidators:true
    })
    return result;
}