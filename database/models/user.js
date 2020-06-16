const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false},
  email: { type: Sequelize.STRING, allowNull: false, isEmail: true},
  userName: { type: Sequelize.STRING, allowNull: false},
  imageUrl: {type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/480x240?text=Placeholder"},
   bookmark: {type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull:true}
//gpa range may need to be changed

});

module.exports = User;
