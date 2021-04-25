module.exports = app => {


    const users = require("./contoller/user.controller");
  
     // Login User
     app.post("/login", users.login);

    // Create a new User
     app.post("/signup", users.create); 

    // Search News by Keyword
     app.get("/news", users.searchNews);

    // weather information
     app.get("/weather", users.weather);
  
    // Retrieve all User
     app.get("/all-users", users.findAll);

     // Logout User
     app.post("/logout", users.logout);
  };