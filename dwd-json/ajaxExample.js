function setup() {
  createCanvas(400, 400);
  getData();
}

function getData() {
      httpGet("http://liveweb.itp.io:9090/send", 'json', false,

              function(response) {
      					for(var i = 0; i < response.length; i++) {
                 	ellipse(response[i].x, response[i].y, 20, 20);
                }
				        setTimeout(getData, 100);
      				});

}

function draw() {
  //background(220);
  fill(0,0,0);
}

function mousePressed() {
 	// if (mouseIsPressed) {
   ellipse(mouseX, mouseY, 20, 20);
    httpGet("http://liveweb.itp.io:9090/save?x="+mouseX+"&y="+mouseY, 'json', false, function(response) {});

  // }
}
