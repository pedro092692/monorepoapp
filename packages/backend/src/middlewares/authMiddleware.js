import jwt from "jsonwebtoken";

class authMiddleware{

    authenticatedToken(){
        return (req, res, next) => {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if(!token){
                res.status(403).json({ message: "Access denied" });
            }
            //very token 
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                console.log(req.user);
                next();
            }catch(error){
                res.status(401).json({ message: "Invalid or expired token" });
            }
        }
    }
}

const authenticated = new authMiddleware().authenticatedToken();
export default authenticated;