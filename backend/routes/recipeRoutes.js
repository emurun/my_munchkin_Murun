// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, instructions, description, ingredients, userId } = req.body;
    //create the recipe
    const recipe = await db.Recipe.create({ title, instructions, description, userId });
    const recipeId = recipe.id;

    //process ingredients 
    for (const name of ingredients) {
      console.log(name);

      const ingredient = await db.Ingredient.findOne({ where: { name } });
      if (!ingredient) {
        return res.status(404).json({ error: `Ingredient ${ingredientName} not found` })
      }

      const ingredientId = ingredient.id;
      console.log(ingredientId);

      //create RecipesIngredients association 
      const RecipesIngredient = await db.RecipeIngredient.create({
        recipeId: recipeId,
        ingredientId: ingredientId,
      });
      console.log(RecipesIngredient.name);
    }

    //handle user-recipe association 
    console.log('user: ' + userId);
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: `User with ID ${userId} not found` });
    }
    console.log(user.username);
    await db.UserRecipe.create({ userId, recipeId: recipeId });

    res.status(201).json(recipe);
  } catch (error) {
    console.error('Create Recipe error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// try {
//   const recipe = await db.Recipe.create(req.body);
//   res.status(201).json(recipe);
// } catch (error) {
//   res.status(400).json({ error: error.message });
// }




// });

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await db.Recipe.findAll({
      include: [
        {
          model: db.Ingredient,
        },
        {
          model: db.User,
        },
      ],
    });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a recipe by Id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await db.Recipe.findByPk(req.params.id, {
      include: {
        model: db.Ingredient,
      }
    });
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a recicpe by ID
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await db.Recipe.findByPk(req.params.id);
    if (recipe) {
      await recipe.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;