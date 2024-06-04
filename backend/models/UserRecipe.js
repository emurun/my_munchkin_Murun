module.exports = (sequelize, DataTypes) => {
  // userId, recipeId
  const User = require('./User');
  const Recipe = require('./Recipe');


  const UserRecipe = sequelize.define('UserRecipe', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
    },

    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipes',
        key: 'id',
      },
    },
  }, {
    tableName: 'users_recipes',
    timestamps: true,
  });

  return UserRecipe;
}




