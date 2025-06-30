const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    feedback: {
        type: mongoose.Schema.Types.ObjectId, // Link to the Feedback item
        ref: 'Feedback', // Refers to the 'Feedback' model
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    // You could add 'author' here if you implement basic auth
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User' // Assuming a 'User' model for basic auth
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;