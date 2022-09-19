const Products = require('../models/Product')

exports.getProductsService = async (query) => {
    const products = await Products.find(query)
    return products
}

exports.createProductService = async (data) => {
    const product = await Products.create(data)
    return product
}

exports.updateProductService = async (productId, data) => {
    const result = await Products.updateOne({ _id: productId }, { $set: data }, { runValidators: true })

    /*   const result=await Products.updateOne({_id:productId},{$inc:data},{runValidators:true}) */

    /*   const product=await Products.findById(productId)
      const result=await product.set(data).save() */
    return result;
}
exports.bulkUpdateProductService = async (data) => {
   /*  const result = await Products.updateMany({_id:data.ids},data.data,{runValidators:true}) */

   const pro=[];
   data.ids.forEach(product =>{
    pro.push(Products.updateOne({_id:product.id},product.data))
   } )
   const result =await Promise.all(pro)
    return result;
}

exports.deleteProductService = async (id) => {
    const result = await Products.deleteOne({_id:id})
    return result;
}
exports.bulkDeleteProductService = async (ids) => {
     const result = await Products.deleteMany({_id:ids},{runValidators:true})
     return result;
 }