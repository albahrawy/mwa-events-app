const express = require('express');
const Events = require('../model/event');
const convertAddress = require('../model/geo-converter');
const uploader = require('../middleware/multer-upload');
const router = express.Router();



router.get('/', async (req, res, next) => {
    const location = req.userInfo?.location;
    const criteria = !!location ? { location: { $near: Object.values(location) } } : {};
    Events.find(criteria, null, { limit: 12 }, (err, event) => {
        if (err) { return next(err) }
        res.json(event);
    });
});

router.post('/', async (req, res, next) => {
    const filter = req.body || {};
    if (!!filter.keyword) {
        filter.$text = { $search: filter.keyword };
        delete filter.keyword;
    }
    if (!!filter.joined && !!req.userInfo) {
        filter['attendees.email'] = req.userInfo?.email;
        delete filter.joined;
    }
    Events.find(filter, (err, event) => {
        if (err) { return next(err) }
        res.json(event);
    });
});



router.get('/myEvents', async (req, res, next) => {
    const requserId = req.userInfo?.id;
    await Events.find({ hostId: requserId }, (err, event) => {
        if (err) { return next(err) }
        res.json(event);
    });
});

router.post('/newEvent', uploader, async (req, res, next) => {
    if (!!req.body?.address) {
        if (typeof req.body.address === "string") {
            req.body.address = JSON.parse(req.body.address);
        }
        const address = `${req.body.address.city},${req.body.address.state},${req.body.address.zip}`;
        req.body.location = await convertAddress(address);
    }
    if (!!req.file) { req.body.image = req.file.filename; }
    req.body.hostId = req.userInfo?.id;
    let newEvent = new Events(req.body);
    newEvent.save((err, event) => {
        if (err) {
            return next(err);
        }
        res.json(event);
    });
})

router.get('/:id', async (req, res, next) => {
    await Events.findOne({ _id: req.params.id }, (err, event) => {
        if (err) {
            return next(err);
        }
        res.json(event);
    })
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

router.patch('/join/:id', async (req, res, next) => {
    const attende = { name: req.userInfo.name, email: req.userInfo.email };
    await Events.updateOne({ _id: req.params.id }, { $addToSet: { 'attendees': attende } }, {}, (err, event) => {
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