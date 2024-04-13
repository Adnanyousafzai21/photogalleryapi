import Jwt from "jsonwebtoken";
import User from "../modle/user-model.js";

const isAutherized = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
     
        if (!token) {
            return res.status(400).send({ message: "user is not authorized" });
        }
        
        const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ message: "Token expired. Please log in again." });
        } else {
            console.error("Error:", error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }
};

export default isAutherized;
