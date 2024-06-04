
module.exports = (sequelize, DataTypes) => {
  // recipeID, ingredientId
  //many to many relations

  const User = require('./User');


  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipes',
        key: 'id',

      }
    },

    ingredientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ingredients',
        key: 'id'
      }
    },
  },
    {
      tableName: 'recipes_ingredients',
      timestamps: true,
    });

  return RecipeIngredient;

}




