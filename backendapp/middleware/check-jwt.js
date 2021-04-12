const jwt = require("jsonwebtoken");
const config = require('../api-config.json');

const jwtVerify = (req, res, next) => {
    // try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret_private_key, (err, decodedToken) => {
        if (!!err) {
            return next({ status: 401, message: 'Authentication failed' });
            //res.status(401).json({ message: 'Authentication failed' });
        } else {
            req.userInfo = decodedToken;
            return next();
        }
    });

    // } catch (e) {
    //     res.status(401).json({ message: 'Authentication failed' })
    // }
}

const createJwt = (userInfo) => {
    return jwt.sign(
        userInfo,
        config.secret_private_key,
        { expiresIn: '1h' }
    );
}

module.exports = { jwtVerify, createJwt }