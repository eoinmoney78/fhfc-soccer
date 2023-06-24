const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    imagePublicId: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Coach', coachSchema);