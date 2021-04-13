const convertAddress = require('../model/geo-converter');

const appendLocation = async (req, res, next) => {
    if (!!req.body?.address) {
        if (typeof req.body.address === "string") {
            req.body.address = JSON.parse(req.body.address);
        }
        const address = `${req.body.address.city},${req.body.address.state},${req.body.address.zip}`;
        req.body.location = await convertAddress(address);
    }
    return next();
}

module.exports = { appendLocation }
