const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    ageGroup: { type: String, required: true }, // can be something like "Under 10", "Under 12" etc.
    position: { type: String, required: true },
    team: { type: String, required: true },
    skillLevel: { type: String, required: false }, // could be "Beginner", "Intermediate", "Advanced" etc.
    favoritePlayer: { type: String, required: false },
    img: String,
});

module.exports = mongoose.model('Player', PlayerSchema);
