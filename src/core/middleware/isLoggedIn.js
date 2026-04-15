import jwt from "jsonwebtoken";

const isLoggedin = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Cookies:", req.cookies);

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // attach user data

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized - Invalid token",
        });
    }
};

export { isLoggedin };