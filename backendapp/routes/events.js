var express = require('express');
const Events = require('../model/event');
const convertAddress = require('../model/geo-converter');
var router = express.Router();



router.get('/', async (req, res, next) => {
    await Events.find({}, (err, event) => {
        if (err) { return next(err) }
        res.json(event);
    });
});
router.get('/userEvents', async (req, res, next) => {
    const requserId = req.userInfo?.id;
    await Events.find({ hostId: requserId }, (err, event) => {
        if (err) { return next(err) }
        res.json(event);
    });
});
router.post('/', async (req, res, next) => {
    if (!!req.body?.address) {
        const address = `${req.body.address.city},${req.body.address.state},${req.body.address.zip}`;
        req.body.location = convertAddress(address);
    }
    let newEvent = new Events(req.body);
    await newEvent.save((err, event) => {
        if (err) {
            return next(err);
        }
        res.json(event);
    });
})
router.put('/:id', async (req, res, next) => {
    const requserId = req.userInfo?.id;
    if (!requserId || requserId != req.body?.hostId) {
        return next("You don't have permission to update this event");
    }
    await Events.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, useFindAndModify: false
    }, (err, event) => {
        if (err) {
            return next(err)
        }
        res.json(event);
    })
})
router.delete('/:id', async (req, res, next) => {
    const requserId = req.userInfo?.id;
    if (!requserId || requserId != req.params.id) {
        return next("You don't have permission to delete this event");
    }
    await Events.remove({ _id: req.params.id }, (err) => {
        if (err) {
            return next(err)
        }
        res.json({ message: 'Event Deleted Successfully' })
    })
})

module.exports = router;