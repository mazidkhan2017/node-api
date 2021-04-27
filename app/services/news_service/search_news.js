const callServer = require("../../apiservices/api_executer");
const jsonparser = require("../../../util/jsonparser")
const news_jsonparser = require("../../../util/news_jsonparser")
const constant = require("../../../app/constant/string_constant")

exports.searchNews = (searchKey, res) => {
    var queryparam = `${searchKey}&apiKey=${constant.NEWS_API_KEY}`
    try {
        callServer.callAPi(queryparam, "GET", "NEWS", apiResponse=>{
            news_jsonparser.newsjson(apiResponse.data, callback=>{
              console.log("Parsed JSON Res-->>>"+JSON.stringify(callback));
              res(callback);
             }) 
            // res(apiResponse.data);
          })
    } catch (error) {
        var jsonobj = {statusCode:500, message:constant.SOME_THING_WRONG}
        res(jsonobj);
    } 
};

exports.fetchWeather = (searchKey, res) => {
    try {
        callServer.callAPi(constant.WEATHER_API_KEY, "GET", "WEATHER", apiResponse=>{
            if(apiResponse.data==='undefined' || apiResponse.data ===undefined){
              var jsonobj = {statusCode:401, message:constant.INVALID_API_KEY}
              res(jsonobj);
            }
            else{
                  jsonparser.weatherjson(apiResponse.data, callback=>{
                      // console.log("Parsed JSON Res-->>>"+JSON.stringify(callback));
                  res(callback);
              })  
          } 
      })
    } catch (error) {
        var jsonobj = {statusCode:500, message:constant.SOME_THING_WRONG}
            res(jsonobj);
    } 
};