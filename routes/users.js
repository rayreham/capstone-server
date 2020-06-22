var express = require("express");
var router = express.Router();
const { User, Article } = require("../database/models");

router.get("/", async (req, res, next) => {
  // try to get user object from database
  try {
    //users will be the result of theuser.findAll promise
    const users = await User.findAll();
    // ifuser is valid, it will be sent as a json response
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  // try to get user object from database
  const { id } = req.params;
  try {
    //users will be the result of theuser.findAll promise
    const user = await User.findByPk(id , {include : Article})
   // const users = await User.findByPk(id);
    // ifuser is valid, it will be sent as a json response
    for(let i = 0; i < user.bookmark.length; i++)
    {
      let article=await Article.findByPk(user.bookmark[i])
      user.articles.push(article);
    }
    res.status(200).json(user);
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});
//SS: hoping that the id is student id
//and req.body structure is like this
//{
// firstName: Some FirstName,
// lastName: some lastName,
// email: some_email
// userName : username
// bookmark_id:id of article
//}
//return 201 if success and 500 on error
//axios.get("http.localhost:3000/api/users/id=1")
//users/?id=
router.put("/", async (req, res, next) => {
  const { id } = req.query;
  const { first_name, last_name, email_add, user_name, bookmark_id } = req.body;
  try {
    let current_student = await User.findByPk(id).then(function (usr) {
      if (usr) {
        //if user exists
        current_student.update({ bookmark: [bookmark_id] });
        res.status(201).json(current_student);
      } else {
        //if user is not found  create a new user
        let new_student = User.create({
          firstName: first_name,
          lastName: last_name,
          email: email_add,
          userName: user_name,
          bookmark: [bookmark_id],
        });
        res.status(201).json(new_student);
      }
    });
  } catch (err) {
    console.log(id);
    console.log(user_name);
    next(err);
  }
});
//
//req.body takes in=> headline, sourcename,author etc
//req,query takes in article_id to search if the article exits | !
//gives 200 on success.....
//
router.put("/getArticle", async (req, res, next) => {
  const { article_id } = req.query;
  const {
    image,
    head_line,
    src_name,
    author,
    descrip,
    article_url,
    pub_date,
  } = req.body;
  try {
    const article_ = await Article.findByPk(article_id)
      if (article_) {
        res.status(200).send(article_.dataValues);
      } else {
        const enter_value = {
          headline: head_line,
          source: src_name,
          author: author,
          articleUrl: article_url,
          publishedAt: pub_date,
          description: descrip,
          imageUrl: image,
        };
        const current_article = await Article.create(enter_value);

        // get the id from request params
        //eventually once we figure out how to track the user that is logged in, this will be the code to get the id from the url
        // const { id } = req.params;

        //just to test out that this works, will update the user's bookmark to include this article id.

        const user = await User.findByPk(2);

        // user.bookmark.push(current_article.id);
        // User.update(user);

        await user.update({ bookmark: [...user.bookmark, current_article.id] });

        //const user = User.findByPk(2);

        // .then((user) => {
        //   user.bookmark.push(current_article.id)
        //   User.update({user})
        // })
        // .then((user => res.status(200).send(user)));

        //res.status(200).send(Article.findAll({where:enter_value}));
        res.status(200).send(current_article);
      }
    }
   catch (err) {
    next(err);
  }
});

// const { username, email_id, article, headline, bookmark_id } = req.body;
// try {
//   let current_student = await User.findByPk(id).then(function (usr) {
//     if (usr) {
//       Current.Studentcontains (ID).then ({ bookmark: [bookmark_id] });
//      else{
//      let new_student = User.create({
//     UserName: first_name,
//      email: last_name,
//      Headline:
//      bookmark: [bookmark_id]
// });

// }
//       res.status(201).json(current_student);

//   // Route to serve singleuser based on its id
// // /api/students/:id
// // /api/students/456 would respond with a campus with id 456
// router.get("/:id", async (req, res, next) => {
//   // take the id from params
//   const { id } = req.params;
//   // query the database for a campus with matching id
//   try {
//     // if successful:
//     const student = await Student.findByPk(id , {include : Campus});
//     // send back the campus as a response
//     res.status(200).json(student);
//   } catch (err) {
//     // if error:
//     // handle error
//     next(err);
//   }
// });

// // Route to handle adding a student
// // /api/campuses/
// router.post("/", async (req, res, next) => {
//   // Take the form data from the request body
//   const { firstName, lastName, email, gpa, imageUrl } = req.body;
//   // Create a campus object
//   const studentObj = {
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     gpa: gpa,
//     imageUrl: imageUrl,
//   };
//   try {
//     // Create a new campus on the database
//     const newStudent = await Student.create(studentObj);
//     // The database would return a campus
//     // send that campus as a json to the client
//     res.status(201).send(newStudent);
//   } catch (err) {
//     next(err);
//   }
// });

// // Route to handle removing a student
// router.delete("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   // get an id for a student to delete
//   try {
//     // pass the id to the database to find student to be deleted
//     // database would either respond succcess or fail
//     const student = await Student.findByPk(id);
//     // invoke the .destroy() method on the returned student
//     await student.destroy();
//     // send a success message to the client
//     res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// });

// // Route to handle editing a student
// // /api/students/:id
// // /api/students/456 would modify a student with id 456
// router.put("/:id", async (req, res, next) => {
//   // get the id from request params
//   const { id } = req.params;
//   // get form data from the request body
//   const { firstName, lastName, email, gpa, imageUrl } = req.body;
//   const updatedObj = {
//     firstName,
//     lastName,
//     email,
//     gpa,
//     imageUrl,
//   };
//   try {
//     // if successfull:
//     // Find a Student with a matching id from the database
//     const student = await Student.findByPk(id);
//     // database would return a valid Student object or an error
//     console.log(updatedObj);
//     // modify the Student object with new form data
//     await student.set(updatedObj);
//     // save the new Student object to the data
//     // database would return a new Student object
//     const updatedStudent = await student.save();
//     console.log(updatedStudent);
//     // send the newStudent as a response from the API
//     res.status(201).send(updatedStudent);
//   } catch (err) {
//     // if error:
//     // handle the error
//     next(err);
//   }
// });

module.exports = router;
