const Sequelize = require("sequelize");
const db = require("../db");

const Student = db.define("student", {
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false},
  email: { type: Sequelize.STRING, allowNull: false, isEmail: true},
  imageUrl: {type: Sequelize.STRING,
    defaultValue: "https://via.placeholder.com/480x240?text=Placeholder"},
  gpa: { type: Sequelize.FLOAT, validate: {min:0.0, max:4.0}}
//gpa range may need to be changed

});

module.exports = Student;
