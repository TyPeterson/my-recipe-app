// main entry point for the backend

// load the environment variables
require('dotenv').config();

// setup the express server
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const errorHandler = require('./middleware/errorHandler');

// connect routes to the express server
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const shareRoutes = require('./routes/shareRoutes');

// create the express server
const app = express();

// Enable CORS for requests from the frontend
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // If sending cookies or other credentials
}));

// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/', ingredientRoutes);
app.use('/', shareRoutes);

// Error-handling middleware
app.use(errorHandler);

// Start listening for requests on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
