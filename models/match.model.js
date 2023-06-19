const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    team1: {
        type: String,
        required: true,
    },
    team2: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    ageGroup: {
        type: String,
        enum: ['U10 Boys', 'U10 Girls', 'U12 Boys', 'U12 Girls'],
        required: true,
    },
});

module.exports = mongoose.model('Match', matchSchema);

// const matchSchema = new mongoose.Schema({
//     date: {
//         type: Date,
//         required: true,
//     },
//     time: {
//         type: String,
//         required: true,
//     },
//     team1: {
//         type: String,
//         required: true,
//     },
//     team2: {
//         type: String,
//         required: true,
//     },
//     location: {
//         type: String,
//         required: true,
//     },
//     ageGroup: {
//         type: String,
//         enum: ['U10 Boys', 'U10 Girls', 'U12 Boys', 'U12 Girls'],
//         required: true,
//     },
// });

// module.exports = mongoose.model('Match', matchSchema);


