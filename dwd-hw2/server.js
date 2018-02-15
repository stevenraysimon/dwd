// var config = require("./config.js");
//
// var mongojs = require('mongojs');
// var db = mongojs(config.username+":"+config.password+"@ds229918.mlab.com:29918/dwd-stevenraysimon", ["Guests"]);

var express = require('express')
var app = express()

var ejs = require('ejs')


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

app.use(express.static('public')) // To serve static files in public directory

app.set('view engine', 'ejs');

var guests = [];

var thisText = 'This is what is from the server file.';

app.get('/', function (req, res) {
  //res.send('Hello World!')
  var fileToSend = "index.html";
  //res.sendfile(fileToSend); // index is landing page
  res.sendfile(fileToSend, {root: './public'}); // Files inside "public" folder
})

app.post('/rsvp', function(req, res){
  //console.log(req.query.name);
  //res.send(req.query.name);
  var textvalue = req.body.name;
  var radioOption = req.body.radio;
  res.send("You submitted: " + textvalue +" and said "+radioOption);
  guests.push([textvalue, radioOption]);
  // db.Guests.save({"Guests": [textvalue, radioOption]}, function(){
  //   if (err || !saved){
  //     console.log("Not Saved!");
  //   }
  //   else{
  //     console.log("Saved.");
  //   }
  // });

})

app.get('/display', function(req, res){
  res.render('displays.ejs', {thisText: thisText}); //First is the name from EJS page, the second is the data
})

//res.render('displays.ejs', {guests: guests});

app.post('/list', function(req, res){
  var textvalue = req.body.name;
  var radioOption = req.body.radio;
  guests.push([textvalue, radioOption]);
  //guests.push([textvalue, radioOption]);
  res.render('rsvp.ejs', {guests: guests}); //First is the name from EJS page, the second is the data
})

app.listen(9000, function () {
  console.log('Example app listening on the PORT--- 9000!')
})


//MongoDB
// mongodb://<dbuser>:<dbpassword>@ds229918.mlab.com:29918/dwd-stevenraysimon



// app.get('/rsvp', function(req, res){
//   //console.log(req.query.name);
//   //res.send(req.query.name);
//   var textvalue = req.query.name;
//   var radioOption = req.query.radio;
//   res.send("You submitted: " + textvalue +" and said "+radioOption);
//   guests.push([req.query.name, req.query.radio]);
//
// })
