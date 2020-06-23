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
 
    console.log("????????????????????" , user)
    res.status(200).json(user);
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});

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

//rename the route not getArticle, maybe bookmark
router.put("/:id/addBookmark", async (req, res, next) => {
  
  try {
    let article = await Article.findOne({where: {articleUrl: req.body.articleUrl}})
    const user = await User.findByPk(req.params.id);


    if(article){
      await user.addArticle(article.id);;
    }
    else{
      article = await Article.create(req.body)
      await user.addArticle(article.id);
    }

        // get the id from request params
        //eventually once we figure out how to track the user that is logged in, this will be the code to get the id from the url
        // const { id } = req.params;

        //just to test out that this works, will update the user's bookmark to include this article id.
        console.log("?????????????" , req.body)
        console.log("before sending response !!!!!!!!!!!!!!!!!!!" , article)
        res.status(200).send(article);
      }
    
   catch (err) {
    next(err);
  }
});
//
//req.body takes in=> headline, sourcename,author etc
//req,query takes in article_id to search if the article exits | !
//gives 200 on success.....
//



module.exports = router;
