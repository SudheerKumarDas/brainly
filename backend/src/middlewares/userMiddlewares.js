import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message:"Please log in first"
            })
        }
        const decodedData = jwt.verify(token,process.env.JWT_TOKEN);
        if(!decodedData){
            return res.status(401).json({
                message:"please log in first"
            })
        }
        const userId = decoded.data.userId;
        req.userId = userId;
        next();
    } catch (error) {
        console.error("Error in getting user : ",error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export default authMiddleware;