# About Project
This application will be use for View News with and can see weather information.
project contain some API's to Signup, Login, SearchNews and fetch Weather Information.
For user data we are using mySql to stor user information and while login we are validating user from same table.
For Accessing news Api we need to pass token in body for user authentication also we can pass token in header but in this application i have pass in request body, user can get this token at the time of Login.
From UI we can manage session with activity tracker or store session locally if there is no action perform during given time, then we can logged out user from application.

In this application i have used JWT Token with simple way to authenticate API. i am creating token with login response model and validating this at the time of news API.
Also we can authenticate user with below mechanism
1. We can pass expiry time of token at the time of JWT token generation.
2. We can cash(In Redis) generated token or store in sql DB and validate same token at the time of API calling.
3. For Two Way authentication we can also encrypt and decrypt request payload from UI and backend and also validate     using token.

# Features
--------

- SignUp User
- Login User
- Search News by key word
- Fetch Weather Information
- For Authentication:- Used JWT Token.
- Logout


# Steps
_________________________________________________________________________________________________

1. Download & Build on local
    A.  Clone the repository, install node packages and verify routes locally
            //on local
            git clone https://github.com/zowe/sample-node-api
            cd sample-node-api
            npm install


2.  Installation
    A. nodejs
    B. mysql
    C. express

3. mySql Table Query.
    A. CREATE TABLE IF NOT EXISTS `users` (
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name varchar(150) NOT NULL,
        email varchar(150) NOT NULL,
        password varchar(150) NOT NULL,
        active BOOLEAN DEFAULT false
        islogin BOOLEAN DEFAULT false
        ) 

4. Run
    A. npm install --- To install all packages in local machine
    B. node server.js

5.  Test API on local
            Open your Postman and verify the sample-node-api is working by accessing:
                1)      Url:      http://localhost:3000/signup   
                        Method:   POST
                        Request   Payload :  {
                                            "email":"mazidkhan008@gmail.com",
                                            "name":"Majid",
                                            "password":"majid123",
                                            "active":true
                                        }

                2)      Url:      http://localhost:3000/login  
                        Method:   POST
                        Request   Payload : {
                                            "email":"mazidkhan0018@gmail.com",
                                            "password":"majid123"
                                        }

                3)      Url:       http://localhost:3000/news?search=india&token=<token>
                        Method:    GET

                4)      Url:       http://localhost:3000/weather
                        Method:    GET

5. Unit Test using supertest
    A. npm test
