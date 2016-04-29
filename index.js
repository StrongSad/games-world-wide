
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var db = require('./models');
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitRoot:false, ignoreAttrs: true, explicitArray:false});
var moment = require('moment')

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

app.use(session({
  secret: 'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  if (req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

app.get('/', function(req, res) {
  db.article.findAll().then(function(articles) {
    res.render('index.ejs', {articles: articles});
  });
});

// Creating the user

app.get('/user/create', function(req, res) {
  res.render('createAccount');
});

app.post('/user/create', function(req, res) {
  
  db.user.findOrCreate({
    where: {
      username: req.body.username
    },
    defaults: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    }
  }).spread(function(user, isNew) {
    console.log(user);
    console.log(isNew);
    if (isNew) {
      res.redirect('/');
    } else {
      res.redirect('/user/create');
    }
  }).catch(function(err) {
    console.log(err);
    console.log(req.body);
    res.redirect('/user/create');
  });
});


// Logging in to access your saved 

app.get('/user/login', function(req, res) {
  res.render('login');
});

app.post('/user/login', function(req, res) {
  var username = req.body.username;
  //console.log(username);
  var password = req.body.password;
  //console.log(password);
  db.user.authenticate(username, password, function(err, user) {
    if (err) {
      res.send(err);
    } else if (user) {
      req.session.userId = user.id;
      console.log(req.session.userId);
      res.redirect('/');
    } else {
      res.send('Something went wrong somewhere... Maybe try again?  or your account might not exist... sorry (in canadian accent to help ease the pain (i am canadian btw))');
    }
  });
});

//logout

app.get('/user/logout', function(req, res) {
  req.session.userId = false;
  res.redirect('/');
})

//users saved articles

app.get('/user/saved', function(req,res) {
  db.user.findById(req.currentUser.id).then(function(user) {
    //if(err) res.send("An error occured");
    if(user) {
      user.getArticles().then(function(articles) {
        console.log(articles);
        res.render('showSaved', {articles: articles});
      })
    }
  });
  // db.saved.findAll({
  //   where: {
  //     userId: req.currentUser.id 
  //   }
  // }).then(function(articles) {
  //   res.render('showSaved', {articles: articles});
  // })
});

app.post('/user/saved', function(req, res) {
  console.log(req.currentUser.id);
  db.article.findOne({where: {id: req.body.articleId}}).then(function(article) {
    db.user.findOne({where: {id: req.currentUser.id}}).then(function(user) {
      user.addArticle(article).then(function() {
        
      });
    });
  });
  // db.saved.create({
  //   article_id: req.body.articleId,
  //   user_id: req.currentUser.id 
  // })
});

app.delete('/user/saved', function(req, res) {

});

app.listen(process.env.PORT || 3000)



































