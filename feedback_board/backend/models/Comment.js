const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    feedback: {
        type: mongoose.Schema.Types.ObjectId, // Link to the Feedback item  stores mongoDb object id    
        ref: 'Feedback', // Refers to the 'Feedback' model
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;