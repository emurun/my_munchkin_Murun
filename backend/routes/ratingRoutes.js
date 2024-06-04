// routes/ratingRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// Create a new rating
router.post('/', async (req, res) => {
  try {
    const rating = await db.Rating.create(req.body);
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get ratings by recipe if recipeId is given ELSE Get all ratings
router.get('/', async (req, res) => {
  if (req.query['recipe_id']) {
    try {
      const recipeId = req.query['recipe_id']

      const ratings = await db.Rating.findAll({
        where: {
          recipeId: recipeId
        },
        include: [
          {
            model: db.User,
          }
        ]
      });
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return
  }


  try {
    const ratings = await db.Rating.findAll();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a rating by ID
router.get('/:id', async (req, res) => {
  try {
    const rating = await db.Rating.findByPk(req.params.id);
    if (rating) {
      res.json(rating);
    } else {
      res.status(404).json({ error: 'Rating not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Delete a rating by ID
router.delete('/:id', async (req, res) => {
  try {
    const rating = await db.Rating.findByPk(req.params.id);
    if (rating) {
      await rating.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Rating not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;