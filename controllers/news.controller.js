const express = require('express');
const router = express.Router();
const { News } = require('../models');
const { validateSession } = require('../middleware');

// Create a new news entry
router.post('/create', validateSession, async (req, res) => {
    const { title, body, dateToPublish } = req.body.news;
    const { id } = req.user;

    try {
        const news = await News.create({
            title,
            body,
            postedBy: id,
            dateToPublish,
        });

        res.status(200).json({
            message: "News created successfully",
            news: news,
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed to create news: ${error}`,
        });
    }
});

// Get all news entries
router.get('/', async (req, res) => {
    try {
        const news = await News.find({});
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({
            message: `Failed to fetch news: ${error}`,
        });
    }
});

// Get a specific news entry by ID
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({
            message: `Failed to fetch news: ${error}`,
        });
    }
});

// Update a news entry
router.put('/:id', validateSession, async (req, res) => {
    const { title, body, dateToPublish } = req.body.news;
    const { id } = req.user;

    try {
        const existingNews = await News.findById(req.params.id);

        if (!existingNews) {
            return res.status(404).json({ message: 'News not found' });
        }

        // convert both sides to string for proper comparison
        if (existingNews.postedBy.toString() !== id.toString()) {
            return res.status(403).json({ message: 'Cannot update news posted by others' });
        }

        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            { title, body, dateToPublish },
            { new: true }
        );

        res.status(204).json({
            message: "News updated successfully",
            news: updatedNews,
        });
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({
            message: `Failed to update news: ${error}`,
        });
    }
});

router.delete('/:id', validateSession, async (req, res) => {
    try {
        const { id } = req.user;
        const existingNews = await News.findById(req.params.id);

        if (!existingNews) {
            return res.status(404).json({ message: 'News not found' });
        }

        // convert both sides to string for proper comparison
        if (existingNews.postedBy.toString() !== id.toString()) {
            return res.status(403).json({ message: 'Cannot delete news posted by others' });
        }

        await News.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({
            message: `Failed to delete news: ${error}`,
        });
    }
});

module.exports = router;
