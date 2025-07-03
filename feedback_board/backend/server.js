require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db'); // Import the DB connection function
const feedbackRoutes = require('./routes/feedbackRoutes'); // Import the feedback routes
const commentRoutes = require('./routes/commentRoutes'); // import comment routes

// Connect to Database
connectDB(); // Call the function to connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Body parser for JSON requests

// Basic route for testing  
app.get('/', (req, res) => {
    res.send('Feedback Board Backend API is running!');  //For testing
});

// API Routes

// Mount the feedback routes at the /feedbacks path
app.use('/feedbacks', feedbackRoutes); // All routes defined in feedbackRoutes.js will be prefixed with /feedbacks


// This structure means /feedbacks/:feedbackId/comments
app.use('/feedbacks', commentRoutes); // The router itself handles the :feedbackId segment
                                   // as it's defined within commentRoutes.js


(async () => {
    try {
        await connectDB(); // Wait for DB connection
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server due to database connection error:', error);
     
    }
})();