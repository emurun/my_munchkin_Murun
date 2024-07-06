const express = require('express');
const path = require('path');
const commentRoutes = require(path.join(__dirname, '..', 'routes', 'commentRoutes'));
const ingredientRoutes = require(path.join(__dirname, '..', 'routes', 'ingredientRoutes'));
const ratingRoutes = require(path.join(__dirname, '..', 'routes', 'ratingRoutes'));
const recipeRoutes = require(path.join(__dirname, '..', 'routes', 'recipeRoutes'));
const userRoutes = require(path.join(__dirname, '..', 'routes', 'userRoutes'));
const userRecipeRoutes = require(path.join(__dirname, '..', 'routes', 'userRecipeRoutes'));


// server/server.js
const cors = require('cors');

// Correct the path to the models directory
const db = require(path.join(__dirname, '..', 'models'));

const app = express();
const PORT = process.env.PORT || 8080
app.use(cors());
app.use(express.json());

// Test the connection to the database
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync all models
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

// Use routes
app.use('/api/comments', commentRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/usersRecipe', userRecipeRoutes);



app.use(express.static('../../frontend/build'))
// Define routes (example)
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

