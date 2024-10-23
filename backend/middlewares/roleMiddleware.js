// middleware/roleMiddleware.js
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const token = req.cookies.token; 

        if (!token) {
            return res.status(403).json({ message: "Access denied, no token provided" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; 

            
            if (req.user.role !== requiredRole) {
                return res.status(403).json({ message: "Unauthorized access" });
            }
            next(); 
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    };
};

module.exports = roleMiddleware;
