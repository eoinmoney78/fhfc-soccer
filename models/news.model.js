const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateToPublish: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('News', NewsSchema);
