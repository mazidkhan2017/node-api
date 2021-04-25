const sql = require("../util/db_connection");
const auth = require("../app/auth/authutil")

const User = function(user) {
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.active = user.active;
  };

  // Insert New user Record in the table
  User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  // Login user by email and password
  User.login = (email,password, result) => {
      sql.query(`select * from users where email = "${email}" and password = "${password}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0].islogin);
        // Check user is already logged in or not...
        if(res[0].islogin===0){
          var update_query = "UPDATE users SET islogin = '1' WHERE id = "+res[0].id;
          sql.query(update_query, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
          });
        }
        else { 
            result(null, {status:400, message: "user already logged in" });
            return;
        }

        res[0].token = auth.generateJWTToken(res[0]) 
        res[0].statusCode = 200
        res[0].message = "Success" 
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ message: "not_found" }, null);
    });
  };

  // Fetch all users
  User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };

  // update islogin status to 0
  User.logout = (email,password, result) => {
    sql.query(`select * from users where email = "${email}" and password = "${password}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0].islogin);
      // Check user is already logged in or not...
      if(res[0].islogin===1){
        var update_query = "UPDATE users SET islogin = '0' WHERE id = "+res[0].id;
        sql.query(update_query, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " record(s) updated");
          result(null, {status:200, message: "Logged out successfully" });
          return;
        });
      }
      else { 
          result(null, {status:400, message: "user is not logged in" });
          return;
      }

      res[0].statusCode = 200
      res[0].message = "Success"
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ message: "not_found" }, null);
  });
};

  module.exports = User;