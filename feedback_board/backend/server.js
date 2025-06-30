require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the DB connection function
const feedbackRoutes = require('./routes/feedbackRoutes'); // Import the feedback routes
const commentRoutes = require('./routes/commentRoutes'); // NEW: Import comment routes

// Connect to Database
connectDB(); // Call the function to connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Body parser for JSON requests

// Basic route for testing (keep this if you like)
app.get('/', (req, res) => {
    res.send('Feedback Board Backend API is running!');
});

// --- API Routes ---
// Mount the feedback routes at the /feedbacks path
app.use('/feedbacks', feedbackRoutes); // All routes defined in feedbackRoutes.js will be prefixed with /feedbacks


// This structure means /feedbacks/:feedbackId/comments
app.use('/feedbacks', commentRoutes); // The router itself handles the :feedbackId segment
                                   // as it's defined within commentRoutes.js

// The app.listen is now inside connectDB in db.js,
// so no need to start server here if you prefer starting only after DB success.
// However, it's generally good practice to put app.listen here
// and just call connectDB at the beginning of the file.

// Let's refine server.js a bit: it's common to listen after all setup,
// and have connectDB handle only the connection.

// --- Refined approach for server.js listen ---
// Instead of app.listen inside db.js, let's keep it here.
// Ensure the app starts listening only if the DB connection is successful.
// connectDB returns a promise, so we can chain .then/.catch.

// (This part replaces the app.listen inside connectDB and keeps it here for better separation)
// ConnectDB will just establish connection and log.
// We'll call it here and then start the server.
// The previous db.js had app.listen, which is less modular.
// Let's remove the app.listen from db.js and put it here.
// Please make sure to update db.js to ONLY export connectDB, not run app.listen.

// If your db.js currently starts app.listen, remove that part from db.js.
// The db.js should look exactly like the example above for db.js.
// Then, server.js will handle the server start:

/*
// NO LONGER NEEDED HERE AS app.listen IS OUTSIDE connectDB:
// Mongoose connection moved to config/db.js
// const MONGODB_URI = process.env.MONGODB_URI;
// if (!MONGODB_URI) { console.error(...); process.exit(1); }
// mongoose.connect(MONGODB_URI)...
*/

// Start the server ONLY after the database connection is attempted.
// The connectDB function itself handles the process.exit(1) if it fails.
// So, we just call it and then proceed to listen.
// This assumes connectDB handles its own exit on failure.
// If you want to wait for DB connection before starting server,
// you'd typically wrap app.listen in a .then() of connectDB's promise.

// A more robust way to ensure server starts only after DB connection:
(async () => {
    try {
        await connectDB(); // Wait for DB connection
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server due to database connection error:', error);
        // connectDB already calls process.exit(1) on failure,
        // so this outer catch might just log.
    }
})();