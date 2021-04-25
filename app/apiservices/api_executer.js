//import axios from "axios";
var axios = require('axios');

  exports.callAPi = (searchKey, methodType, requestType, apiCallBack) => {
    try {
  
      if (methodType.toUpperCase() === "POST") {
        // TODO
      } else if (methodType.toUpperCase() === "GET") {

          var url = ""
          if(requestType === "NEWS"){
            let baseUrl = "https://newsapi.org/v2/"
            url = baseUrl+"everything?q="+searchKey
          }
          else if (requestType === "WEATHER") {
            let baseUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Pune&appid="
            url = baseUrl+searchKey
          }  
          console.log("url : "+ url);
        axios
          .get(url)
          .then((response) => {
            console.log("POST Response "+ response);
  
            apiCallBack(response);
          })
          .catch((error) => {
            console.log("GET Error in API Connection : "+ error);
  
            apiCallBack(error);
          });
      }
    } catch (methodError) {
        console.log("Catch -- "+ methodError);
      apiCallBack(methodError);
    }
  };