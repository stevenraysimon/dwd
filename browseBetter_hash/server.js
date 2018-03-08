//npm install cookie-parser
//npm install express-session
//npm install nedb-session-store
//npm install node-uuid....... This didn't work
//npm install uuid
//npm install ejs

var https = require('https');
var fs = require('fs'); // Using the filesystem module

var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

var express = require('express');
var app = express();
var session = require('express-session');
var nedbstore = require('nedb-session-store')(session);

// User database
var Datastore = require('nedb');
var db = new Datastore({ filename: 'users.db', autoload: true });

var httpsServer = https.createServer(credentials, app);

// https://github.com/kelektiv/node-uuid
// npm install node-uuid
const uuidV1 = require('uuid/v1');

//This loads css, js, etc from public folder
app.use(express.static('public')) // To serve static files in public directory

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

// npm install bcrypt-nodejs
var bcrypt = require('bcrypt-nodejs');

function generateHash(password) {
	return bcrypt.hashSync(password);
}

function compareHash(password, hash) {
    return bcrypt.compareSync(password, hash);
}

var allowedUsers = [];

app.use(
	session(
		{
			secret: 'secret',
			cookie: {
				 maxAge: 365 * 24 * 60 * 60 * 1000   // e.g. 1 year
				},
			store: new nedbstore({
			filename: 'sessions.db'
			})
		}
	)
);

// Main page
app.get('/', function(req, res) {
		//res.render('login.ejs', {});
  	var fileToSend = "index.html";
  	res.sendfile(fileToSend, {root: './public'}); // Files inside "public" folder

});

//They clicked sign in
app.get('/goToLogin', function(req, res){
  //Go to the login page
	res.render('login.ejs');
})

//They clicked unlock Academic
app.get('/academicSurvey', function(req, res){
	res.render('academicSurvey.ejs', req.session);
  //res.send(academic_survey_complete);
})

//They clicked browse for academic
app.get('/companies', function(req, res){
  //Go to the companies page for universities
	res.render('companies.ejs', req.session);
})

//They clicked create new account
app.get('/backToMain', function(req, res){

          if (req.session.score > 0){
            //They have completed this survery and it is unlocked
            res.render('main_academic.ejs', req.session);

          } else{
            //They did not complete this survery
            res.render('main.ejs', req.session);
          }

})

//They clicked create new account
app.post('/goToNewAccount', function(req, res){
  //Go to the login page
	res.render('createAccount.ejs');
})

app.get('/logout', function(req, res) {
	delete req.session.username;
	res.redirect('/');
});

app.post('/register', function(req, res){

    var userName = req.body.username;
    var passWord = req.body.password;
    var passwordHash = generateHash(req.body.password);
    var theirScore = 0;
    allowedUsers.push({"username":userName, "password": passwordHash, "score": theirScore});
    console.log(allowedUsers);

  	var registration = {
  		"username": req.body.username,
  		"password": passwordHash,
  		"score": 0
  	};

  	db.insert(registration);
  	console.log("inserted " + registration);

    res.render('login.ejs');
});

app.post('/getScore', function(req, res){

          req.session.score = req.body.score;
          db.score = req.body.score;

          if (req.session.score > 0){
            //They have completed this survery and it is unlocked
            res.render('main_academic.ejs', req.session);

          } else{
            //They did not complete this survery
            res.render('main.ejs', req.session);
          }

          console.log(req.session.username+" has a new score of "+req.session.score);

});

// Post from login page
app.post('/login', function(req, res) {

  // Check username and password in database
	db.findOne({"username": req.body.username},
		function(err, doc) {
			if (doc != null) {

				// Found user, check password
				if (compareHash(req.body.password, doc.password)) {
					// Set the session variable
					req.session.username = doc.username;
          req.session.score = doc.score;

          if (req.session.score > 0){
            //They have completed this survery and it is unlocked
            res.render('main_academic.ejs', req.session);

          } else{
            //They did not complete this survery
            res.render('main.ejs', req.session);
          }


      } else {

        // Redirect back to main page
    		res.render('login.ejs');

      }
    }
  })

});

// app.listen(8080);
httpsServer.listen(8080);
