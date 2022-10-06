const Stock = require("../models/Stock");


exports.getStockctsService=async (filters,queries)=>{
    const stock = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields)
    const totalProduct=await Stock.countDocuments(filters);
    const pageCount=Math.ceil(totalProduct/queries.limit)
    return {totalProduct,pageCount,stock};
}


exports.createStockService = async (data) => {
    const result = await Stock.create(data)
    return result;
}
exports.getStockByIdService = async (id) => {
    const result = await Stock.findOne({_id:id}).populate("store.id").populate("suppliedBy.id").populate("brand.id")
    return result;
}