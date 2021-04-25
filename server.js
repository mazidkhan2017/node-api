const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;


const app = express();
const default_res_obj = {"statusCode": 200, "message":"Working successfully"};
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    return res.json(default_res_obj);
  });
  
  // set port, listen for requests
  require("./app/route/user.routes.js")(app);
  app.listen(port, () => {
    console.log("Server is running on port 3000.");
  });

  