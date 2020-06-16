const { Campus, Student } = require("../database/models");

const seedDatabase = async () => {
  await Promise.all([
    Campus.create({
      name: "Brooklyn College",
      address: "Brooklyn",
      description: "A college in Brooklyn",
    }),
    Campus.create({
      name: "College of Staten Island",
      address: "Staten Island",
      description: "A college on Staten Island",
    }),
    Campus.create({
      name: "John Jay College",
      address: "Manhattan",
      description: "A college in Manhattan",
    }),
    Student.create({ firstName: "Daniel", lastName:'Smith',email:'danielSmith@gmail.com', gpa: '3.0',}),
    Student.create({ firstName: "Sally", lastName:'Jensen',email:'sallyJensen@yahoo.com',gpa: '3.8', campusId: 1 }),
  ]);
};

module.exports = seedDatabase;
