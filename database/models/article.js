const Sequelize = require("sequelize");
const db = require("../db");

const Article = db.define("article", {
  headline: { type: Sequelize.STRING, defaultValue: "default_headline"  },
  source: { type: Sequelize.STRING,  defaultValue: "default_source"},
  author: { type: Sequelize.STRING,  defaultValue: "default_author"},
  // description: { type: Sequelize.STRING, allowNull: false },
  articleUrl: { type: Sequelize.STRING,  defaultValue: "default_articleUrl" },
  publishedAt: { type: Sequelize.STRING,  defaultValue: "default_publishe_date" },
  // Iffy with this -> content: { type: Sequelize.STRING, allowNull: false },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/480x240?text=Placeholder",
  },
  description: { type: Sequelize.TEXT, defaultValue: "default_description" },
});

module.exports = Article;
