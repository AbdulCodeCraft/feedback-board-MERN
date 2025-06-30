const express = require('express');
const Feedback = require('../models/Feedback'); // Import the Feedback model

const router = express.Router(); // Create a new router instance

// 1. POST /feedbacks - Submit new feedback
router.post('/', async (req, res) => {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Title, description, and category are required.' });
    }

    try {
        const newFeedback = new Feedback({
            title,
            description,
            category
        });

        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        console.error('Error submitting new feedback:', error);
        res.status(500).json({ message: 'Server error: Could not submit feedback.' });
    }
});

// 2. GET /feedbacks - Get all feedbacks
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ message: 'Server error: Could not retrieve feedbacks.' });
    }
});

// 3. GET /feedbacks/:id - Get single feedback
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }

        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error fetching single feedback:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid feedback ID format.' });
        }
        res.status(500).json({ message: 'Server error: Could not retrieve feedback.' });
    }
});

// 4. PATCH /feedbacks/:id/upvote - Increment upvote count
router.patch('/:id/upvote', async (req, res) => {
    try {
        const { id } = req.params;

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { $inc: { upvotes: 1 } },
            { new: true }
        );

        if (!updatedFeedback) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }

        res.status(200).json(updatedFeedback);
    } catch (error) {
        console.error('Error upvoting feedback:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid feedback ID format.' });
        }
        res.status(500).json({ message: 'Server error: Could not upvote feedback.' });
    }
});

// 5. PATCH /feedbacks/:id/status - Update status (admin only, optional)
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['Open', 'Planned', 'In Progress', 'Done'];
        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid or missing status provided. Allowed statuses: ' + allowedStatuses.join(', ') });
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, runValidators: true }
        );

        if (!updatedFeedback) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }

        res.status(200).json(updatedFeedback);
    } catch (error) {
        console.error('Error updating feedback status:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid feedback ID format.' });
        }
        res.status(500).json({ message: 'Server error: Could not update feedback status.' });
    }
});

module.exports = router; // Export the router