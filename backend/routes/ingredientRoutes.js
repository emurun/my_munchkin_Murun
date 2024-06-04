// routes/ingredientRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models');


// Create a new ingredient
router.post('/', async (req, res) => {
  try {
    const ingredient = await db.Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await db.Ingredient.findAll();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// getIngredientById
//Get ingredient by Id
router.get('/:id', async (req, res) => {
  try {
    const ingredient = await db.Ingredient.findByPk(req.params.id)
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;