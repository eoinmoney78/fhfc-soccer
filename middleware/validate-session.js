const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateSession = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);

        const decoded = await jwt.verify(token, process.env.JWT);

        const user = await User.finfById(decoded.id);
        if (!user) throw new Error('User not Found!');
        console.log(user);
        req.user = user;
        return next();

    } catch (err) {
        res.json({ message: err.message });
    }
}

module.exports = validateSession;