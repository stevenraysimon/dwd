var express = require('express')
var app = express()

var ejs = require('ejs')

var config = require("./config.js");
var mongojs = require('mongojs');

var db = mongojs(config.username+":"+config.password+"@ds235788.mlab.com:35788/stephanie", ["Guests"]);
//mongodb://config.username:config.password@ds235788.mlab.com:35788/stephanie
//var db = mongojs("stevenraysimon:johnsonMAN2@ds229918.mlab.com:29918/dwd-stevenraysimon", ["Guests"]);
//var db = mongojs('stevenraysimon:johnsonMAN2@ds229918.mlab.com:29918/dwd-stevenraysimon', ["Guests"]);


// var db = mongojs("ds229918.mlab.com:29918/dwd-stevenraysimon")
// var mycollection = db.collection('Guests')

//This is for POST. Needs req.body.name
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

app.use(express.static('public')) // To serve static files in public directory

app.set('view engine', 'ejs');

var guests = [];

var thisText = 'This is the display page now.';

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

  /********* Save to MongoDB **************/
  db.Guests.save({"Guests": [textvalue, radioOption]}, function(err, saved){
    if (err || !saved){
      console.log("Not Saved!");
    }
    else{
      console.log("Saved.");
    }
  });

  /********** Pull from MongoDB ************/
  db.Guests.find({}, function(err, saved) {
  if (err || !saved) {
  	console.log("No results");
  }
  else {
  	// saved.forEach(function(record) {
    console.log("Success.");
    res.render('rsvp.ejs', {guests: saved});
  }

  	/* Alternatively you could loop through the records with a "for"
  	for (var i = 0; i < saved.length; i++) {
	  	console.log(saved[i]);
	}
	*/
  });
  //res.render('rsvp.ejs', {guests: guests}); //First is the name from EJS page, the second is the data
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
