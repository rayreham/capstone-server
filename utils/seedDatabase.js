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
      Article.create(
      {
        headline: "Measuring the Neutron's lifetime from space could solve an enduring mystery ",
        source: "Science News",
        author: "Emily Conover",
        description: "The European Space Agency's Solar Orbiter made its first close pass of the sun on Monday, getting as close as 48 million miles from the sun's surface.",
        articleUrl: "https://www.sciencenews.org/article/measuring-neutron-lifetime-space-could-solve-enduring-mystery",
        publishedAt: "2020-06-15T15:03:452",
        imageUrl: "https://www.sciencenews.org/wp-content/uploads/2020/06/061220_ec_neutron-lifetime_feat-1028x579.jpg",
        }
      ),
        Article.create(
        {
          headline: "Humans found able to infer behavioral information from chimpanzee vocalizations",
          source: "PhysOrg",
          author: "Bob Yirka",
          description: "A team of researchers from the University of Amsterdam, the University of York and the Max Planck Institute for Evolutionary Anthropology,",
          articleUrl: "https://phys.org/news/2020-06-humans-infer-behavioral-chimpanzee-vocalizations.html",
          publishedAt: "2020-06-15T17:03:56Z",
          imageUrl: "https://scx1.b-cdn.net/csz/news/800/2017/59cd065ee0dc6.jpg",
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
