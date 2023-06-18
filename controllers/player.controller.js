const router = require('express').Router();
const { Player } = require('../models');
const { validateSession } = require('../middleware');

// Create a new soccer player
router.post('/', validateSession, async (req, res) => {
    try {
        console.log('Creating a new player:', req.body);

        const newPlayer = await Player.create({
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
        console.log('Fetching all players');

        const players = await Player.find({});

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
        console.log('Fetching player with id:', req.params.id);

        const player = await Player.findById(req.params.id);

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
        console.log('Updating player with id:', req.params.id);
        console.log('New player data:', req.body);

        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });

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
        console.log('Deleting player with id:', req.params.id);

        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);

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

// localhost:{{PORT}}/user/me
// Get the current user's data, including admin status

router.get('/me', validateSession, async (req, res) => {
    try {
        console.log('Fetching current user:', req.user);
        const user = await User.findById(req.user.id).select('firstName lastName email isAdmin');

        if (!user) {
            console.log('User not found');
            res.status(404).json({
                message: 'User not found'
            });
        } else {
            console.log('Fetched current user:', user);
            res.status(200).json({
                user,
                isAdmin: user.isAdmin
            });
        }
    } catch (error) {
        console.error('Error fetching current user:', error.message);
        res.status(500).json({
            error: error.message
        });
    }
});


module.exports = router;
