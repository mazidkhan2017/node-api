var jwt = require('jsonwebtoken');
const SECRET_KEY = "abc@#$#tech";

exports.generateJWTToken = (userData) =>{
    return jwt.sign(JSON.stringify(userData), SECRET_KEY);
 }
 exports.verifyToken = (jwtToken) =>{
    try{
       return jwt.verify(jwtToken, SECRET_KEY);
    }catch(e){
       return null;
    }
 }