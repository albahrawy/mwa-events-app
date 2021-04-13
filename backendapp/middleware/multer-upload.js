const express = require('express');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: './assets/eventImages/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})


const uploader = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.indexOf("image" != -1)) {
            cb(null, true);
        } else {
            return cb(new Error('Only Images allowed!'), false);
        }
    },
    limits: {
        fileSize: 3 * 1024 * 1024
    }
});

module.exports = uploader.single('image');