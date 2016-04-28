var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitRoot:false, ignoreAttrs: true, explicitArray:false});
var $ = require('jQuery');
var request = require('request');
var db = require('./../../models');

fs.readFile('gamespot.xml', 'utf8', function(err, xml) {
  parser.parseString(xml, function(err, result) {
    result.channel.item.forEach(function(item) {
      db.article.findOrCreate({
        where: {
          title: item.title
        },
        defaults: {
          link: item.link,
          description: item.link,
          pubdate: item.pubDate
        }
      }).spread(function(article, isNew) {
        console.log(article);
        console.log(isNew);
        if(isNew) {
          console.log("This is a new article");
        } else {
          console.log("this article aready exists");
        }
      })
    })
  });
});




  

//       //res.render("articles", {results: results});
//     }
//   });
// });

//<script type="text/javascript">
//     $(document).ready(function() {
//     var theString = "<p>A string <span>with a span in it</span></p>";
//     var theResult = $(theString).remove().html();
//     theResult = $(theString).remove().html();


//   console.log(theResult);
// });
//   </script>

// $(document).ready(function() {
//   var theString = "<p>A string <span>with a span in it</span></p>";
//   var theResult = $(theString).remove().html();

//   console.log(theResult);
// });





































