
var moment = require('moment');

exports.newsjson = (jsonobject, callback) => {
    var resobj = {} 
    var finalres = []
   if(jsonobject.status==="ok"){
    resobj.status = 200
    resobj.message = "Success"
    resobj.count=jsonobject.length

    jsonobject.articles.forEach(obj => {
        var jsonobject = {}
        jsonobject.headline= obj.title
        jsonobject.link=obj.url
        jsonobject.author = obj.author
        jsonobject.publishedAt = moment(obj.publishedAt).format("dddd MMMM DD YYYY")

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