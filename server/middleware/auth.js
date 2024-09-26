// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        // Extract the token from the header
        const token = req.header("Authorization");

        // Check if the token is not provided
        if (!token) {
            return res.status(403).json({ message: "Access Denied. No token provided." });
        }

        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the verified user information to the request
        req.user = verified;
        
        // Pass the control to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};
