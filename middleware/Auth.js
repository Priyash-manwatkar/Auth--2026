import jwt from 'jsonwebtoken'
const verifyToken=async(req,res,next)=>{
    try {
        let token=req.cookies.token  ||
      req.headers.authorization?.split(" ")[1];
;

        if(!token) return res.status(500).json("unvalid token");

        let decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user =decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
}
export default verifyToken;