var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

app.use(express.static('public')) // To serve static files in public directory


var guests = [];

app.get('/', function (req, res) {
  //res.send('Hello World!')
  var fileToSend = "index.html";
  //res.sendfile(fileToSend); // index is landing page
  res.sendfile(fileToSend, {root: './public'}); // Files inside "public" folder
});
})

app.get('/rsvp', function(req, res){
  //console.log(req.query.name);
  //res.send(req.query.name);
  var textvalue = req.query.name;
  res.send("You submitted: " + textvalue);
  //res.send(req.body.optradio);
  guests.push(req.query.name);

})

app.get('/display', function(req, res){
  var html = "<html><body><p>";
  for (var i = 0; i < guests.length; i++){
    html = html + guests[i] + "<br>";
  }
  html = html + "</p></body></html>";
  res.send(html);

})

app.listen(9000, function () {
  console.log('Example app listening on the PORT--- 9000!')
})
