const callServer = require("../../apiservices/api_executer");
const jsonparser = require("../../../util/jsonparser")

let news_api_key = "f6dc5ec1e08147cb8e10707f13e0fd5a"
let weather_api_key = "284823ccf6217d4af0a93ee435725c01"

exports.searchNews_ = (req, res) => {

    var searchKey = ""
    callServer(searchKey, "GET", apiResponse=>{

    })
};

exports.searchNews = (searchKey, res) => {
    var queryparam = `${searchKey}&apiKey=${news_api_key}`
      callServer.callAPi(queryparam, "GET", "NEWS", apiResponse=>{
       console.log("Api Res-->>>"+JSON.stringify(apiResponse.data));
       res(apiResponse.data);
    })
};

exports.fetchWeather = (searchKey, res) => {
      callServer.callAPi(weather_api_key, "GET", "WEATHER", apiResponse=>{
       jsonparser.weatherjson(apiResponse.data, callback=>{
        console.log("Api Res-->>>"+JSON.stringify(callback));
        res(callback);
       }) 
    })
    
};