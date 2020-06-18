/**
 * Here, we will sync our database, create our application, and export this
 * module so that we can use it in the bin directory, where we will be able to
 * establish a server to listen and handle requests and responses;
 */

// Load environmental variables from .env file
//Access-Control-Allow-Origin: {http://localhost:5000/auth/me}
require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");


//NEW ADDITION


const session = require("express-session");
const passport = require("passport");
const authRouter = require("./auth");
const apiRouter = require("./routes");
const cors = require("cors");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./database");
const sessionStore = new SequelizeStore({ db });

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  }
  catch (err) {
    done(err);
  }
});
const syncDb = async () => {
  await db.sync({ force: true });
}

const configureApp = () => {
  app.use(helmet());
  app.use(logger("dev"));
  // handle request data:
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  app.use(cookieParser());

  // Our apiRouter
  const apiRouter = require("./routes/index");

  // Mount our apiRouter
  app.use("/api", apiRouter);

  // Error handling;
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // More error handling;
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ credentials: true, origin: 'http://localhost:5432' }))
  app.use(
    session({
      secret: "a super secretive secret key string to encrypt and sign the cookie",
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/auth", authRouter);
  app.use("/api", apiRouter);
}

const startListening = () => {
  const PORT = 5432;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!`);
  })
}

const bootApp = async () => {
  await sessionStore.sync();
  await syncDb();
  await syncDatabase();
  await configureApp();
  await startListening();
  
}



//end





// Utilities;
const createLocalDatabase = require("./utils/createLocalDatabase");
const seedDatabase = require("./utils/seedDatabase");

// Our database instance;
//const db = require("./database");

// A helper function to sync our database;
const syncDatabase = () => {
  if (process.env.NODE_ENV === "production") {
    db.sync();
  } else {
    console.log("As a reminder, the forced synchronization option is on");
    db.sync({ force: true })
      .then(() => seedDatabase())
      .catch((err) => {
        if (err.name === "SequelizeConnectionError") {
          createLocalDatabase();
          seedDatabase();
        } else {
          console.log(err);
        }
      });
  }
};

// Instantiate our express application;
const app = express();

// A helper function to create our app with configurations and middleware;
//const configureApp = () => {
  // app.use(helmet());
  // app.use(logger("dev"));
  // // handle request data:
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  // app.use(compression());
  // app.use(cookieParser());

  // // Our apiRouter
  // const apiRouter = require("./routes/index");

  // // Mount our apiRouter
  // app.use("/api", apiRouter);

  // // Error handling;
  // app.use((req, res, next) => {
  //   if (path.extname(req.path).length) {
  //     const err = new Error("Not found");
  //     err.status = 404;
  //     next(err);
  //   } else {
  //     next();
  //   }
  // });

  // // More error handling;
  // app.use((err, req, res, next) => {
  //   console.error(err);
  //   console.error(err.stack);
  //   res.status(err.status || 500).send(err.message || "Internal server error.");
  // });
//};

// Main function declaration;
// const bootApp = async () => {
//   await syncDatabase();
//   await configureApp();
// };

// Main function invocation;
bootApp();

// Export our app, so that it can be imported in the www file;
module.exports = app;
