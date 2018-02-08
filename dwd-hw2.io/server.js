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
})

app.get('/rsvp', function(req, res){
  //console.log(req.query.name);
  //res.send(req.query.name);
  var textvalue = req.query.name;
  var radioOption = req.query.radio;
  res.send("You submitted: " + textvalue +" and said "+radioOption);
  guests.push([req.query.name, req.query.radio]);

})

app.get('/display', function(req, res){
  var html = '<html><body><div class="main_menu">
      <ul>
        <a href="https://www.bedbathandbeyond.com/store/giftregistry/view_registry_guest.jsp?eventType=Wedding&registryId=545383491" target="_blank" title="Wedding Registry" alt="https://www.bedbathandbeyond.com/"><li>Registry</li></a>
        <a href="#" id="dates" title="Dates" alt="https://www.bedbathandbeyond.com/"><li>Dates</li></a>
        <a href="#" id="directions" title="Directions" alt="https://www.bedbathandbeyond.com/"><li>Directions</li></a>
        <a href="#" id="about" title="About" alt="https://www.bedbathandbeyond.com/"><li>About</li></a>
        <a href="#" id="rsvp" title="RSVP" alt="https://www.bedbathandbeyond.com/"><li>RSVP</li></a>
      </ul>
    </div>
    <div class="blackCover">
    </div>
  <div class="wrapper">
  <div class="wrap">
      <div class="logo">
          <div class="wrap-logo">
              <a href="index.html">
                <img class="logoImage" src="images/logo.png" alt="stephanie & josh" />
            </a>
          </div>
     </div>
  <a href="#" title="Menu">
    <div class="menuButton" id="menuButton">
      <div class="bar" id="barOne"></div>
      <div class="bar" id="barTwo"></div>
    </div>
  </a><p class="lightPadTop">';
  for (var i = 0; i < guests.length; i++){
    html = html + guests[i] + "<br>";
  }
  html = html + "</p></div></body></html>";
  res.send(html);
})

app.listen(9000, function () {
  console.log('Example app listening on the PORT--- 9000!')
})
