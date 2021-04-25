const User = require("../../../model/user");
const service = require("../../services/news_service/search_news")
const auth = require("../../auth/authutil")

// Create and Save a new User Api Implementation
exports.create = (req, res) => {
  
     // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
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
          err.message || "Some error occurred while creating the User."
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
                message: `User not found `
            });
          } else {
            res.status(500).send({
                statusCode: 500,
                message: "Error retrieving User "
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
    console.log("isAuth === "+isAuth)

    if(isAuth === null){
        var data = {}
        data.status = 401
        data.message = "Invalid token"
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
  User.logout(req.body.email, req.body.password, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
              statusCode: 404,
              message: `User not found `
          });
        } else {
          res.status(500).send({
              statusCode: 500,
              message: "Error retrieving User "
          });
        }
      } 
      else
      {
          res.send(data);
      }
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};
