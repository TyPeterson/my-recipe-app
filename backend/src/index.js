// main entry point for the backend

// load the environment variables
require('dotenv').config();

// setup the express server
const express = require('express');

const errorHandler = require('./middleware/errorHandler');

// connect routes to the express server
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const shareRoutes = require('./routes/shareRoutes');


// create the express server
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/', ingredientRoutes);
app.use('/', shareRoutes);

app.use(errorHandler);

// start listening for requests on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});