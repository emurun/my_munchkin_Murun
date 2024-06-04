module.exports = (sequelize, DataTypes) => {

  const Rating = sequelize.define('Rating', {
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipes',
        key: 'id',
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
  },
    {
      tableName: 'ratings',
      timestamps: true,

    })

  return Rating;

}

