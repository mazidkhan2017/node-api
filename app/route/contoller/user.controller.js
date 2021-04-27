const User = require("../../../model/user");
const service = require("../../services/news_service/search_news")
const auth = require("../../auth/authutil")
const constant = require("../../../app/constant/string_constant")

// Create and Save a new User Api Implementation
exports.create = (req, res) => {
  
     // Validate request
    if (!req.body) {
        res.status(400).send({
        message: constant.CAN_NOT_EMPTY
        });
    }

   // Create a User
   const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    active: req.body.active
  });

  
  // Create User in the database 
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || constant.SOME_THING_WRONG
      });
    else res.send(data);
  });
};

// Login user with email and password Api Implementation
exports.login = (req, res) => { 
    User.login(req.body.email,req.body.password, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
                statusCode: 404,
                message: constant.USER_NOT_FOUND
            });
          } else {
            res.status(500).send({
                statusCode: 500,
                message: constant.SOME_THING_WRONG
            });
          }
        } 
        else
        {
            res.send(data);
        }
      });
};

// Search news Api Implementation.
exports.searchNews = (req, res) => {
    // Authenticate API with Token
    var isAuth = auth.verifyToken(req.query.token)  

    if(isAuth === null){
        var data = {}
        data.status = 401
        data.message = constant.INVALID_TOKEN
        res.send(data);
    }
    else{
     //Holds value of the query param 'search' 
     const searchQuery = req.query.search;
     console.log("Search-->>> "+searchQuery)

     service.searchNews(searchQuery, (data) => {
        res.send(data);
      });
    }
};

// Weather Api Implementation
exports.weather = (req, res) => {
    service.fetchWeather("", (data) => {
        res.send(data);
      });
};

// Logout user Api Implementation
exports.logout = (req, res) => {  
  try {
    User.logout(req.body.email, req.body.password, (err, data) => {
      if (err) { 
        if (err.kind === "not_found") {
          res.status(404).send({
              statusCode: 404,
              message: constant.USER_NOT_FOUND
          });
        } else {
          res.status(500).send({
              statusCode: 500,
              message: constant.SOME_THING_WRONG
          });
        }
      } 
      else
      {
        console.log("data==>>>>"+JSON.stringify(data))
        res.send(data);
      }
    });
  } catch (error) {
    var jsonobj = {statusCode:500, message:constant.SOME_THING_WRONG}
    res(jsonobj);
  } 
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || constant.SOME_THING_WRONG
          });
        else res.send(data);
      });
};
