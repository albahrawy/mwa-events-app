const Events = require('../model/event');

const tryCatchAndJson = async (action, res, next, customJson) => {
    try {
        let result = await action();
        if (!!customJson) { result = customJson };
        res.json(result);
    } catch (err) {
        return next(err);
    }
}

const verifyEventOwner = async (req, res, next) => {
    const requserId = req.userInfo?.id;
    try {
        const hostId = (await Events.findById(req.params.id)).hostId;
        if (!requserId || requserId != hostId) {
            return next("You don't have permission to do this action");
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = { tryCatchAndJson, verifyEventOwner };