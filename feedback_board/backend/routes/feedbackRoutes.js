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

// CORRECTED: GET /feedbacks - Get all feedbacks (with optional search, filter, and sort)
router.get('/', async (req, res) => {
    try {
        // Destructure all possible query parameters
        const { q, status, category, sortBy, sortOrder } = req.query;
        let query = {}; // This object will hold all our filter conditions for Mongoose
        let sort = { createdAt: -1 }; // Default sort: newest first

        // 1. Search (existing logic)
        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ];
        }

        // 2. Filter by Status
        if (status) {
            const allowedStatuses = ['Open', 'Planned', 'In Progress', 'Done'];
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({ message: 'Invalid status filter provided.' });
            }
            query.status = status; // Add status filter to the query object
        }

        // 3. Filter by Category
        if (category) {
            const allowedCategories = ['Feature', 'Bug', 'UI', 'Other'];
            if (!allowedCategories.includes(category)) {
                return res.status(400).json({ message: 'Invalid category filter provided.' });
            }
            query.category = category; // Add category filter to the query object
        }

        // 4. Sorting
        if (sortBy) {
            const validSortFields = ['upvotes', 'createdAt'];
            if (!validSortFields.includes(sortBy)) {
                return res.status(400).json({ message: 'Invalid sortBy field provided.' });
            }
            // Determine sort order: 1 for ascending, -1 for descending
            const order = (sortOrder === 'asc' || sortOrder === '1') ? 1 : -1;
            sort = { [sortBy]: order }; // Dynamically set the sort field and order
        } else {
            // If sortBy is not provided but sortOrder is, apply it to default createdAt
            if (sortOrder) {
                const order = (sortOrder === 'asc' || sortOrder === '1') ? 1 : -1;
                sort = { createdAt: order };
            }
        }

        // Execute the Mongoose find operation with the constructed query and sort objects
        const feedbacks = await Feedback.find(query)
                                      .sort(sort);
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