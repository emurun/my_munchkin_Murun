// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const comment = await db.Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get comments by RecipeId
router.get('/', async (req, res) => {
  if (req.query['recipe_id']) {
    try {
      const recipeId = req.query['recipe_id'];
      const comments = await db.Comment.findAll({
        where: {
          recipeId: recipeId
        },
        include: [{
          model: db.User,
        }]
      });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


});

module.exports = router;
