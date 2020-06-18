const Sequelize = require("sequelize");
const db = require("../db");
//NEW
const crypto = require("crypto");

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("password");
    }
  },
  // salt is random data that is used as an additional input to a one-way function that hashes data, a password or passphrase
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
});

User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

const setSaltAndPassword = user => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);


//OLD
// const User = db.define("user", {
//   firstName: { type: Sequelize.STRING, allowNull: false },
//   lastName: { type: Sequelize.STRING, allowNull: false},
//   email: { type: Sequelize.STRING, allowNull: false, isEmail: true},
//   userName: { type: Sequelize.STRING, allowNull: false},
//   imageUrl: {type: Sequelize.STRING,
//     defaultValue: "https://via.placeholder.com/480x240?text=Placeholder"},
//    bookmark: {type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull:true}
//gpa range may need to be changed

//});

module.exports = User;
