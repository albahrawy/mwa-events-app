const express = require('express');
const Events = require('../model/event');
const uploader = require('../middleware/multer-upload');
const { appendLocation } = require('../middleware/location-convert');
const { tryCatchAndJson, verifyEventOwner } = require('../middleware/util');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const location = req.userInfo?.location;
    const criteria = !!location ? { location: { $near: Object.values(location) } } : {};
    return tryCatchAndJson(() => Events.find(criteria, null, { limit: 12, sort: { date: -1 } }), res, next);
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
    return tryCatchAndJson(() => Events.find(filter, null, { sort: { date: -1 } }), res, next);
});

router.get('/myEvents', async (req, res, next) => {
    return tryCatchAndJson(() => Events.find({ hostId: req.userInfo?.id }, null, { limit: 12, sort: { date: -1 } }), res, next);
});

router.post('/newEvent', uploader, appendLocation, async (req, res, next) => {

    if (!!req.file) { req.body.image = req.file.filename; }
    req.body.hostId = req.userInfo?.id;
    return tryCatchAndJson(() => new Events(req.body).save(), res, next);
});

router.get('/:id', async (req, res, next) => {
    return tryCatchAndJson(() => Events.findOne({ _id: req.params.id }), res, next);
})

router.patch('/updateEvent/:id', uploader, verifyEventOwner, appendLocation, async (req, res, next) => {

    if (!!req.file) { req.body.image = req.file.filename; }
    return tryCatchAndJson(() => Events.findOneAndUpdate({ _id: req.params.id }, req.body,
        { new: true, useFindAndModify: false }), res, next);
})

router.patch('/join/:id', async (req, res, next) => {

    const attende = { name: req.userInfo.name, email: req.userInfo.email };
    let action;
    let isJoind = req.body?.status == null ? true : !!req.body.status;
    if (isJoind) {
        action = { $addToSet: { 'attendees': attende } };
    } else {
        action = { $pull: { attendees: { email: attende.email } } }
    }

    return tryCatchAndJson(() => Events.updateOne({ _id: req.params.id }, action), res, next, { isJoind });
})


router.patch('/comment/:id', async (req, res, next) => {

    const comment = { name: req.userInfo.name, email: req.userInfo.email, content: req.body.comment };
    return tryCatchAndJson(() => Events.findByIdAndUpdate(req.params.id,
        { $addToSet: { 'comments': comment } }, { new: true }), res, next);
});

router.delete('/:id', verifyEventOwner, async (req, res, next) => {
    return tryCatchAndJson(() => Events.remove({ _id: req.params.id }), res, next, { message: 'Event Deleted Successfully' });
});

module.exports = router;