const router = require('express').Router();
const { Coach } = require('../models');
const { validateSession } = require('../middleware');

// Create a new coach
router.post('/', validateSession, async (req, res) => {
    try {
        const newCoach = await Coach.create({
            name: req.body.name,
            about: req.body.about,
            img: req.body.img,
            imagePublicId: req.body.imagePublicId,
        });

        res.status(201).json({
            message: 'Coach created successfully',
            newCoach
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// Get all coaches
router.get('/getall/', validateSession, async (req, res) => {
    try {
        const coaches = await Coach.find({});

        res.status(200).json({
            coaches
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// Get a specific coach
router.get('/:id', validateSession, async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.id);

        if (!coach) {
            res.status(404).json({
                message: 'Coach not found'
            });
        } else {
            res.status(200).json({
                coach
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// Update a coach
router.put('/:id', validateSession, async (req, res) => {
    try {
        const updatedCoach = await Coach.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedCoach) {
            res.status(404).json({
                message: 'Coach not found'
            });
        } else {
            res.status(200).json({
                message: 'Coach updated successfully',
                updatedCoach
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// Delete a coach
router.delete('/:id', validateSession, async (req, res) => {
    try {
        const deletedCoach = await Coach.findByIdAndDelete(req.params.id);

        if (!deletedCoach) {
            res.status(404).json({
                message: 'Coach not found'
            });
        } else {
            res.status(200).json({
                message: 'Coach deleted successfully',
                deletedCoach
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
