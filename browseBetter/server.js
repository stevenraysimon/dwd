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

var allowedUsers = [
	{"username": "vanevery", "password": "vanevery", "score": 0},
	{"username": "root", "password": "password", "score": 0},
	{"username": "john", "password": "pass", "score": 0}
];

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

  for (var i = 0; i < allowedUsers.length; i++) {
    if (allowedUsers[i].username == req.session.username) {

          if (allowedUsers[i].score > 0){
            //They have completed this survery and it is unlocked
            res.render('main_academic.ejs', req.session);

          } else{
            //They did not complete this survery
            res.render('main.ejs', req.session);
          }

    }
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
    var passwordHash = generateHash(req.body.password);
    var passWord = req.body.password;
    var theirScore = 0;
    allowedUsers.push({"username":userName, "password": passWord, "score": theirScore});
    console.log(allowedUsers);

    res.render('login.ejs');
});

app.post('/getScore', function(req, res){

    					//When the quiz is submitted on main page, give a new score to the user logged in only
              for (var i = 0; i < allowedUsers.length; i++) {
            		if (allowedUsers[i].username == req.session.username) {

                    //Change the score
                    allowedUsers[i].score = req.body.score;

                    //Set the session to display the score change
                    req.session.score = allowedUsers[i].score;

                    if (allowedUsers[i].score > 0){
                      //They have completed this survery and it is unlocked
                      res.render('main_academic.ejs', req.session);

                    } else{
                      //They did not complete this survery
                      res.render('main.ejs', req.session);
                    }
                }
              }
    					console.log(req.session.username+" has a new score of "+req.session.score);

});

// Post from login page
app.post('/login', function(req, res) {


	// Check username and password in database
	for (var i = 0; i < allowedUsers.length; i++) {
		if (allowedUsers[i].username == req.body.username &&
          allowedUsers[i].password == req.body.password) {

					// Found user
					var userRecord = allowedUsers[i];

          // if (compareHash(req.body.password, userRecord.password)){
          //   console.log("true");
          // } else{
          //   console.log("false");
          // }

					// Set the session variable
					req.session.username = userRecord.username;
          // Get the score of 0
          req.session.score = userRecord.score;

					// Put some other data in there
					req.session.lastlogin = Date.now();

					break;
		}
	}
	if (!req.session.username) {
		// Redirect back to main page
		res.render('login.ejs');
	} else {
			// Give them the main page
  		//res.send('session user-id: ' + req.session.userid + '. ');
      for (var i = 0; i < allowedUsers.length; i++) {
        if (allowedUsers[i].username == req.session.username) {

              if (allowedUsers[i].score > 0){
                //They have completed this survery and it is unlocked
                res.render('main_academic.ejs', req.session);

              } else{
                //They did not complete this survery
                res.render('main.ejs', req.session);
              }

        }
      }
	}

});

// app.listen(8080);
httpsServer.listen(8080);
