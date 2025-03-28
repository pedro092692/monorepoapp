import jwt from "jsonwebtoken";

class authMiddleware{

    authenticatedToken(){
        return (req, res, next) => {
            console.log('Request Cookies:', req.headers);
            console.log(req.cookies);
            const token = req.cookies.token;
            if(!token){
                return res.status(403).json({ message: "Access denied" });
            }
            //verify token 
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                next();
            }catch(error){
                return res.status(401).json({ message: "Invalid or expired token" });
            }
        }
    }

    isAdmin() {
        return (req, res, next) => {
            try {
                if (!req.user) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                
                const role = req.user.role;
                if (role === 'admin') {
                    return next();
                }
                
                res.status(403).json({ message: "Forbidden" });
            } catch (error) {
                console.error("Error in isAdmin middleware:", error);
                res.status(500).json({ success: false, error: error.message });
            }
        };
    }
}

const authenticated = new authMiddleware().authenticatedToken();
const isAdmin = new authMiddleware().isAdmin();
export default authenticated;
export { isAdmin };