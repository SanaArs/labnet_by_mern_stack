import jwt from "jsonwebtoken";

const isLoggedin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - No token"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // must contain id or email
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

export { isLoggedin };