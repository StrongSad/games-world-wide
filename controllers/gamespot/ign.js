
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitRoot:false, ignoreAttrs: true, explicitArray:false});
var $ = require('jQuery');
var request = require('request');
var db = require('./../../models');


// request('http://feeds.ign.com/ign/all?format=xml', function(err, request, body) {
//   console.log(body);
//   parser.parseString(body.data, function(error, result) {
//     console.log(result);
//   });
// });


request({
    url: 'http://ign-apis.herokuapp.com/videos?startIndex=30&count=15',
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var dataObj = JSON.parse(body);
      //console.log(dataObj);
      var results = dataObj.data; 
      //console.log(results);

      results.forEach(function(result) {
        db.article.findOrCreate({
          where: {
            title: result.metadata.title
          },
          defaults: {
            link: result.metadata.url,
            description: result.metadata.description,
            pubdate: result.metadata.publishDate
          }
        }).spread(function(article, isNew) {
          console.log(article);
          console.log(isNew);
          if(isNew) {
            console.log("this is a new articles");
          } else {
            console.log("this articles is already in the data base");
          }
        })
      });

      //res.render("videos", {results: results});
    }
  });


// app.get("/articles", function(req, res) {
//   console.log("in articles function");
//   request({
//     url: 'http://ign-apis.herokuapp.com/articles?startIndex=30&count=15',
//   }, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var dataObj = JSON.parse(body);
//       //console.log(dataObj);
//       var results = dataObj.data; 
//       //console.log(results);
//       results.forEach(function(result) {
//         db.article.findOrCreat({
//           where: {
//             title: result.metadata.headline
//           },
//           defaults: {
//             link: result.thumbnail,
//             description: result.metadata.slug,
//             pubdate: result.metadata.publishDate
//           }
//         })
//       });
