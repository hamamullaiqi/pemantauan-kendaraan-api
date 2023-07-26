import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send({
            message: "Access Denied",
        });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified?.dataValues;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            message: "invalid Token",
        });
    }
};
