const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, DataTypes);
db.Recipe = require('./Recipe')(sequelize, DataTypes);
db.Ingredient = require('./Ingredient')(sequelize, DataTypes);
db.Comment = require('./Comment')(sequelize, DataTypes);
db.Rating = require('./Rating')(sequelize, DataTypes);
db.RecipeIngredient = require('./RecipeIngredient')(sequelize, DataTypes);
db.UserRecipe = require('./UserRecipe')(sequelize, DataTypes);

// module.exports = db;

//Defining Associations 
db.User.hasMany(db.Recipe, { foreignKey: 'userId' });
db.Recipe.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasMany(db.Comment, { foreignKey: 'userId' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId' });

db.Recipe.hasMany(db.Comment, { foreignKey: 'recipeId' });
db.Comment.belongsTo(db.Recipe, { foreignKey: 'recipeId' });

db.Recipe.hasMany(db.Rating, { foreignKey: 'recipeId' });
db.Rating.belongsTo(db.Recipe, { foreignKey: 'recipeId' });

db.User.hasMany(db.Rating, { foreignKey: 'userId' });
db.Rating.belongsTo(db.User, { foreignKey: 'userId' });

db.Recipe.belongsToMany(db.Ingredient, { through: db.RecipeIngredient, foreignKey: 'recipeId' });
db.Ingredient.belongsToMany(db.Recipe, { through: db.RecipeIngredient, foreignKey: 'ingredientId' });

db.User.belongsToMany(db.Recipe, { through: db.UserRecipe, foreignKey: 'userId' });
db.Recipe.belongsToMany(db.User, { through: db.UserRecipe, foreignKey: 'recipeId' });


module.exports = db;
