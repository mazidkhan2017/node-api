
var moment = require('moment');

exports.weatherjson = (jsonobject, callback) => {
    var resobj = {} 
    var finalres = []
   if(jsonobject.cod==="200"){
    resobj.status = 200
    resobj.message = "Success"
    resobj.count=jsonobject.cnt
    resobj.unit="standard"
    resobj.location="Pune"


    jsonobject.list.forEach(obj => {
        var jsonobject = {}
        jsonobject.date=moment(obj.dt_txt).format("dddd MMMM DD YYYY")
        jsonobject.main=obj.weather[0].main
        jsonobject.temp=obj.main.temp

        finalres.push(jsonobject)
      });
      resobj.date = finalres

      callback(resobj)
   }
   else{ 
       resobj.status = 400
       resobj.message="Invalid Data"
       callback(resobj)
   }
};