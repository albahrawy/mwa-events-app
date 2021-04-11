const mongoose = require("mongoose");
const validator = require("validator");

const Event = mongoose.model('Events', {

    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hostId: {
        type: ObjectId()

    },
    address: {
        city: {
            type: String,
            required: true
        }, state: {
            type: String,
            required: true
        }, zip: {
            type: String,
            required: true
        }
    },
    location: {
        long: {
            type: Number,
            required: true
        }, lat: {
            type: Number,
            required: true
        }
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    comments: [{
        name: { type: String },

        email: {
            type: String

        },
        content: { type: String }
    }],
    attendees: [{
        name: {
            type: String

        }, lastName: {
            type: String

        },
        email: {
            type: String

        }
    }]

});

module.exports = Event