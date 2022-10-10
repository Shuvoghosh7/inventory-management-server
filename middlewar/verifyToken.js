var jwt = require('jsonwebtoken');
const{promisify}=require("util");

/* 
1.Check if token exists
2.if not token send res
3.decode the token
4.if valid next

*/

module.exports=async(req,res,next)=>{
    
    try {
        // 1.Check if token exists
        const token=req.headers?.authorization?.split(" ")?.[1];

        // 2.if not token send res
        if(!token){
            return res.status(401).json({
                status:"fail",
                error:"You are not logged in"
            })
        }
        // 3.decode the token
        const decoded=await promisify(jwt.verify)(token,process.env.TOKEN_SECRET)
        
        // const user=User.findOne({email:decoded.email})
        // req.user=user;
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            status:"fail",
            error:"Invalid token"
        })
    }
}