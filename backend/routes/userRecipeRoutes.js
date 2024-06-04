// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// Create a new UsersRecipe
router.post('/', async (req, res) => {
  try {
    const usersRecipes = await db.UserRecipe.create(req.body);
    res.status(201).json(usersRecipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get recipes by user ID
router.get('/', async (req, res) => {
  if (req.query['user_id']) {
    try {
      const userId = req.query['user_id']; // Assuming the query parameter is 'user_id'
      const userRecipes = await db.UserRecipe.findAll({
        where: { userId },
        include: [{
          model: db.Recipe,
          attributes: ['id', 'title', 'description', 'instructions'], // Specify the attributes to retrieve
        }],
      });

      // Map the results to return detailed recipe information
      const recipes = userRecipes.map(userRecipe => userRecipe.Recipe);

      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.query['recipe_id']) {
    try {
      const recipeId = req.query['recipe_id'];
      const userRecipes = await db.UserRecipe.findAll({
        where: { recipeId },
        attributes: ['userId'], // Only select the userId attribute
      });

      if (userRecipes.length > 0) {
        const userIds = userRecipes.map(userRecipe => userRecipe.userId);
        res.json({ userIds });
      } else {
        res.status(404).json({ error: 'No users found for the given recipe ID' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const usersRecipes = await db.UserRecipe.findAll();
      res.json(usersRecipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;

