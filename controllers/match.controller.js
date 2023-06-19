// Match.controller.js
const router = require('express').Router();
const { Match } = require('../models');
const { validateSession } = require('../middleware');

// Create a new match
router.post('/', validateSession, async (req, res) => {
    try {
        console.log('Creating a new match:', req.body);

        const newMatch = await Match.create({
            date: req.body.date,
            time: req.body.time,
            team1: req.body.team1,
            team2: req.body.team2,
            location: req.body.location,
            ageGroup: req.body.ageGroup,
        });

        console.log('New match created:', newMatch);
        res.status(201).json({
            message: 'Match created successfully',
            newMatch,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
});


// Get all matches
router.get('/getall', validateSession, async (req, res) => {
    try {
        console.log('Fetching all matches');

        const matches = await Match.find({});

        console.log('All matches fetched:', matches);
        res.status(200).json({
            matches,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
});

// Get a specific match
router.get('/:id', validateSession, async (req, res) => {
    try {
        console.log('Fetching match with id:', req.params.id);

        const match = await Match.findById(req.params.id);

        if (!match) {
            res.status(404).json({
                message: 'Match not found',
            });
        } else {
            console.log('Match fetched with id', req.params.id, ':', match);
            res.status(200).json({
                match,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
});

// Update a match
router.put('/:id', validateSession, async (req, res) => {
    try {
        console.log('Updating match with id:', req.params.id);
        console.log('New match data:', req.body);

        const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedMatch) {
            res.status(404).json({
                message: 'Match not found',
            });
        } else {
            console.log('Match updated with id', req.params.id, ':', updatedMatch);
            res.status(200).json({
                message: 'Match updated successfully',
                updatedMatch,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
});


// Delete a match
router.delete('/:id', validateSession, async (req, res) => {
    try {
        console.log('Deleting match with id:', req.params.id);

        const deletedMatch = await Match.findByIdAndDelete(req.params.id);

        if (!deletedMatch) {
            res.status(404).json({
                message: 'Match not found',
            });
        } else {
            console.log('Match deleted with id', req.params.id, ':', deletedMatch);
            res.status(200).json({
                message: 'Match deleted successfully',
                deletedMatch,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
});

module.exports = router;
