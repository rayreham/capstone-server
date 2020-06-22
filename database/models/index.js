// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const Article = require("./article");
const User = require("./user");

 User.hasMany(Article);

 Article.belongsToMany(User, {through:"bookmark"});
// Student.belongsTo(Campus);

module.exports = {
  Article,
  User
};

