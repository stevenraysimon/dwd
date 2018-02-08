var express = require('express')
var app = express()

// var bodyParser = require('body-parser');
// app.use(bodyParser.json()); // to support JSON bodies
// app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies


var guests = [];

app.get('/', function (req, res) {
  //res.send('Hello World!')
  var fileToSend = "index.html";
  res.sendfile(fileToSend, {root: './public'}); // Files inside "public" folder
})

app.get('/rsvp', function(req, res){
  console.log(req.query.textfield);
  res.send(req.query.textfield);
  //res.send(req.body.optradio);
  guests.push(req.query.textfield);

})

app.get('/display', function(req, res){
  var html = "<html><body>";
  for (var i = 0; i < guests.length; i++){
    html = html + guests[i] + "<br>";
  }
  html = html + "</body></html>";
  res.send(html);

})

app.listen(9000, function () {
  console.log('Example app listening on the PORT--- 9000!')
})
