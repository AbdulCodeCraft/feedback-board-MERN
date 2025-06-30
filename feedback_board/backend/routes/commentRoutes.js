const express = require('express');
const Comment = require('../models/Comment'); // Import the Comment model
const Feedback = require('../models/Feedback'); // Needed to validate feedback existence

const router = express.Router();

// POST /feedbacks/:feedbackId/comments - Add a new comment to a specific feedback
router.post('/:feedbackId/comments', async (req, res) => {
    const { feedbackId } = req.params;
    const { content } = req.body; // Assuming 'content' is sent in the request body

    if (!content) {
        return res.status(400).json({ message: 'Comment content is required.' });
    }

    try {
        // Optional: Verify if the feedback item actually exists
        const feedbackExists = await Feedback.findById(feedbackId);
        if (!feedbackExists) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }

        const newComment = new Comment({
            feedback: feedbackId,
            content
            // If you have 'author', add: author: req.user.id (after basic auth setup)
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid feedback ID format.' });
        }
        res.status(500).json({ message: 'Server error: Could not add comment.' });
    }
});

// GET /feedbacks/:feedbackId/comments - Get all comments for a specific feedback
router.get('/:feedbackId/comments', async (req, res) => {
    const { feedbackId } = req.params;

    try {
        // Optional: Verify if the feedback item actually exists
        const feedbackExists = await Feedback.findById(feedbackId);
        if (!feedbackExists) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }

        const comments = await Comment.find({ feedback: feedbackId }).sort({ createdAt: 1 }); // Oldest comments first
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid feedback ID format.' });
        }
        res.status(500).json({ message: 'Server error: Could not retrieve comments.' });
    }
});

module.exports = router;