module.exports = (sequelize, DataTypes) => {

  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

  }, {
    tableName: 'ingredients',
    timestamps: true,
  });
  return Ingredient;
}


