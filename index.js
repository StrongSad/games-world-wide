
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var db = require('./models');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

// request('https://ign.com/', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     console.log(html);
//   }
// }); // run with $ node scrape.js in terminal














var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});