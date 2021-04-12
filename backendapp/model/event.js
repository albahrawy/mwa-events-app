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
    date_added: { 
        type : Date, 
        default: Date.now 
    },
    hostId: {
        type: String

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
            first: { type: String },
            last: { type: String }
        },
        email: {
            type: String

        }
    }]

});

module.exports = Event