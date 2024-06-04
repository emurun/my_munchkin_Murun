// const User = require('./User');
// const Recipe = require('./Recipe');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,

      references: {
        model: 'users',
        key: 'id',
      },
    },

    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipes',
        key: 'id',
      },
    },
  },
    {
      tableName: 'comments',
      timestamps: true,
    });
  return Comment;
}





