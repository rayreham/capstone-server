const { Article, User } = require("../database/models");

const seedDatabase = async () => {
  await Promise.all([    
    Article.create(
      {
      headline: "Solar Orbiter makes its first close pass of the sun - CNN",
      source: "CNN",
      author: "Amy Woodyatt",
      description: "The European Space Agency's Solar Orbiter made its first close pass of the sun on Monday, getting as close as 48 million miles from the sun's surface.",
      articleUrl: "https://www.cnn.com/2020/06/15/world/solar-orbiter-sun-pass-intl-scli-scn/index.html",
      publishedAt: "2020-06-15T13:03:56Z",
      imageUrl: "https://cdn.cnn.com/cnnnext/dam/assets/200615061433-solar-orbiter-sun-pass-super-tease.jpg",
      }
    ),
    
    User.create(
      { 
      firstName: "Rachel", 
      lastName:'Greene',
      email:'rachelGreene@yahoo.com',
      userName:'SallyIsMeUsername'
      //imageUrl: ""
    }),

    User.create(
      { 
      firstName: "Chris", 
      lastName:'Rock',
      email:'chrisRock@gmail',
      userName:'IsTheRealChrisRockUsername',
      bookmark:[1]
      //imageUrl: ""
    }),


  ]);
};

module.exports = seedDatabase;
