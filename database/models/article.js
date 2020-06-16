const Sequelize = require("sequelize");
const db = require("../db");

const Article = db.define("article", {
  headline: { type: Sequelize.STRING, allowNull: false },
  source: { type: Sequelize.STRING, allowNull: false },
  author: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  articleUrl: { type: Sequelize.STRING, allowNull: false },
  publishedAt: { type: Sequelize.STRING, allowNull: false },
  // Iffy with this -> content: { type: Sequelize.STRING, allowNull: false },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/480x240?text=Placeholder",
  },
  description: { type: Sequelize.TEXT, defaultValue: "", allowNull: false },
});

module.exports = Article;
