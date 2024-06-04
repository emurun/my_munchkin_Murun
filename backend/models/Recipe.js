module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
  }, {
    tableName: 'recipes',
    timestamps: true,
  });
  return Recipe;
}


