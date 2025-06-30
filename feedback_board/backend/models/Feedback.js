const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Feature', 'Bug', 'UI', 'Other'],
        default: 'Other',
        required: true
    },
    status: {
        type: String,
        enum: ['Open', 'Planned', 'In Progress', 'Done'],
        default: 'Open'
    },
    upvotes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback; // Export the model for use in routes