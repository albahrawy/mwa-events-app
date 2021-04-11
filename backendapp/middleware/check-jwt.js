const jwt = require("jsonwebtoken");
const config = require('../api-config.json');

const jwtVerify = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.secret_private_key, (err, decodedToken) => {
            req.userInfo = decodedToken;
            next();
        });

    } catch (e) {
        res.status(401).json({ message: 'Authentication failed' })
    }
}

const createJwt = (userInfo) => {
    return jwt.sign(
        userInfo,
        config.secret_private_key,
        { expiresIn: '1h' }
    );
}

module.exports = { jwtVerify, createJwt }