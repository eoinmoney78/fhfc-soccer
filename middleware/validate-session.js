



const jwt = require('jsonwebtoken');
const { User } = require('../models');


const validateSession = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).send({ auth: false, message: "No token provided." });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT);
        } catch (err) {
            return res.status(403).send({ auth: false, message: "Failed to authenticate token." });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(403).send({ auth: false, message: "User not found." });
        }

        req.user = user;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Internal server error." });
    }
}
module.exports = validateSession;