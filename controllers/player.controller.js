const router = require('express').Router();
const { YouthSoccerPlayer } = require('../models');
const { validateSession } = require('../middleware');

// Create a new soccer player
router.post('/', validateSession, async (req, res) => {
    try {
        const newPlayer = await YouthSoccerPlayer.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            ageGroup: req.body.ageGroup,
            position: req.body.position,
            team: req.body.team,
            skillLevel: req.body.skillLevel,
            favoritePlayer: req.body.favoritePlayer,
            img: req.body.img,
        });

        console.log("New player created:", newPlayer);
        res.status(201).json({
            message: 'Player created successfully',
            newPlayer
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// Get all soccer players
router.get('/getall/', validateSession, async (req, res) => {
    try {
        const players = await YouthSoccerPlayer.find({});

        console.log(`All players fetched:`, players);
        res.status(200).json({
            players
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// Get a specific player
router.get('/:id', validateSession, async (req, res) => {
    try {
        const player = await YouthSoccerPlayer.findById(req.params.id);

        if (!player) {
            res.status(404).json({
                message: 'Player not found'
            });
        } else {
            console.log(`Player fetched with id ${req.params.id}:`, player);
            res.status(200).json({
                player
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// Update a player
router.put('/:id', validateSession, async (req, res) => {
    try {
        const updatedPlayer = await YouthSoccerPlayer.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedPlayer) {
            res.status(404).json({
                message: 'Player not found'
            });
        } else {
            console.log(`Player updated with id ${req.params.id}:`, updatedPlayer);
            res.status(200).json({
                message: 'Player updated successfully',
                updatedPlayer
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// Delete a player
router.delete('/:id', validateSession, async (req, res) => {
    try {
        const deletedPlayer = await YouthSoccerPlayer.findByIdAndDelete(req.params.id);

        if (!deletedPlayer) {
            res.status(404).json({
                message: 'Player not found'
            });
        } else {
            console.log(`Player deleted with id ${req.params.id}:`, deletedPlayer);
            res.status(200).json({
                message: 'Player deleted successfully',
                deletedPlayer
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
