var scaleFactor = 0.75;

// Create the canvas
var canvas = document.getElementById("jp_canvas");
var ctx = canvas.getContext("2d");

// Intro image
var introReady = false;
var introImage = new Image();
introImage.onload = function () {
	introReady = true;
};
introImage.src = "images/intro.png";

var game_finished = false;
var time_display="00:00:00:00";
var update_time = false;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// door image
var doorReady = false;
var doorImage = new Image();
doorImage.onload = function () {
	doorReady = true;
};
doorImage.src = "images/door.png";

var jimmy_life=false;
// jimmy_right image
var jimmy_rightReady = false;
var jimmy_rightImage = new Image();
jimmy_rightImage.onload = function () {
	jimmy_rightReady = true;
};
jimmy_rightImage.src = "images/jimmy_right.png";

// jimmy_left image
var jimmy_leftReady = false;
var jimmy_leftImage = new Image();
jimmy_leftImage.onload = function () {
	jimmy_leftReady = true;
};
jimmy_leftImage.src = "images/jimmy_left.png";

// jimmy_right_fly image
var jimmy_right_flyReady = false;
var jimmy_right_flyImage = new Image();
jimmy_right_flyImage.onload = function () {
	jimmy_right_flyReady = true;
};
jimmy_right_flyImage.src = "images/jimmy_right_fly.png";

// jimmy_left_fly image
var jimmy_left_flyReady = false;
var jimmy_left_flyImage = new Image();
jimmy_left_flyImage.onload = function () {
	jimmy_left_flyReady = true;
};
jimmy_left_flyImage.src = "images/jimmy_left_fly.png";

// point image
var pointReady = false;
var pointImage = new Image();
pointImage.onload = function () {
	pointReady = true;
};
pointImage.src = "images/point.png";

// Game objects
var jimmy = {
	speed: 256 // movement in pixels per second
};
var points = [];
var walls = [];
var door = {};
var pointsCaught = 0;
var directionH="right";
var directionV="down";
var introStop = false;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];

    if(e.keyCode === 32 && game_finished)
        reset();
}, false);

var init = function() {
    jimmy_life = true;
    jimmy.x = 480*scaleFactor;
    jimmy.y = 495*scaleFactor;
    jimmy.width = 30*scaleFactor;
    jimmy.height = 60*scaleFactor;

    door.x = 725*scaleFactor;
    door.y = 30*scaleFactor;
    door.width = 60*scaleFactor;
    door.height = 55*scaleFactor;

    points = [
        {x: 25*scaleFactor, y: 60*scaleFactor},
        {x: 50*scaleFactor, y: 425*scaleFactor},
        {x: 95*scaleFactor, y: 150*scaleFactor},
        {x: 160*scaleFactor, y: 340*scaleFactor},
        {x: 250*scaleFactor, y: 275*scaleFactor},
        {x: 260*scaleFactor, y: 160*scaleFactor},
        {x: 270*scaleFactor, y: 65*scaleFactor},
        {x: 360*scaleFactor, y: 447*scaleFactor},
        {x: 370*scaleFactor, y: 115*scaleFactor},
        {x: 465*scaleFactor, y: 355*scaleFactor},
        {x: 495*scaleFactor, y: 225*scaleFactor},
        {x: 615*scaleFactor, y: 390*scaleFactor},
        {x: 675*scaleFactor, y: 325*scaleFactor},
        {x: 710*scaleFactor, y: 180*scaleFactor},
        {x: 735*scaleFactor, y: 325*scaleFactor}
    ];

    for(var i = 0; i < points.length; i++) {
        points[i].width = 15*scaleFactor;
        points[i].height = 20*scaleFactor;
        points[i].life = true;
    }

    walls = [
        {x: scaleFactor*15, y: scaleFactor*80, width: scaleFactor*30, height: scaleFactor*20},
        {x: scaleFactor*84, y: scaleFactor*170, width: scaleFactor*30, height: scaleFactor*35},
        {x: scaleFactor*39, y: scaleFactor*444, width: scaleFactor*30, height: scaleFactor*20},
        {x: scaleFactor*663, y: scaleFactor*345, width: scaleFactor*30, height: scaleFactor*35},
        {x: scaleFactor*724, y: scaleFactor*345, width: scaleFactor*30, height: scaleFactor*35},

        {x: scaleFactor*349, y: scaleFactor*136, width: scaleFactor*55, height: scaleFactor*20},
        {x: scaleFactor*243, y: scaleFactor*295, width: scaleFactor*63, height: scaleFactor*20},
        {x: scaleFactor*120, y: scaleFactor*361, width: scaleFactor*75, height: scaleFactor*20},
        {x: scaleFactor*39, y: scaleFactor*345, width: scaleFactor*71, height: scaleFactor*20},

        {x: scaleFactor*100, y: scaleFactor*405, width: scaleFactor*155, height: scaleFactor*20},
        {x: scaleFactor*305, y: scaleFactor*468, width: scaleFactor*100, height: scaleFactor*20},
        {x: scaleFactor*365, y: scaleFactor*375, width: scaleFactor*150, height: scaleFactor*20},
        {x: scaleFactor*574, y: scaleFactor*410, width: scaleFactor*181, height: scaleFactor*20},

        {x: scaleFactor*39, y: scaleFactor*245, width: scaleFactor*159, height: scaleFactor*20},
        {x: scaleFactor*270, y: scaleFactor*245, width: scaleFactor*305, height: scaleFactor*20},
        {x: scaleFactor*244, y: scaleFactor*180, width: scaleFactor*136, height: scaleFactor*20},
        {x: scaleFactor*500, y: scaleFactor*145, width: scaleFactor*149, height: scaleFactor*20},
        {x: scaleFactor*635, y: scaleFactor*199, width: scaleFactor*151, height: scaleFactor*20},
        {x: scaleFactor*700, y: scaleFactor*85, width: scaleFactor*85, height: scaleFactor*20},
        {x: scaleFactor*311, y: scaleFactor*34, width: scaleFactor*144, height: scaleFactor*20},
        {x: scaleFactor*159, y: scaleFactor*85, width: scaleFactor*151, height: scaleFactor*20}
    ];
};

// Reset the game when the player catches a point
var reset = function () {
	jimmy.x = 480*scaleFactor;
	jimmy.y = 495*scaleFactor;

	game_finished = false;
    jimmy_rightReady=true;
    jimmy_leftReady=true;
    jimmy_right_flyReady=true;
    jimmy_left_flyReady=true;
    jimmy_life=true;

    for(var i = 0; i < points.length; i++) {
        points[i].life = true;
    }

    pointsCaught = 0;

    milisec = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    update_time=false;
    time_display="00:00:00:00";
};

// Update game objects
var update = function (modifier) {
    if(!jimmy_life)
        return;

	if (38 in keysDown) { // Player holding up
        update_time=true;
		jimmy.y -= jimmy.speed * modifier;
		directionV = "up";
		introStop=true;
	}
	else if (jimmy.y <= 495*scaleFactor){
		jimmy.y+=jimmy.speed * modifier;
        if(jimmy.y >= 495*scaleFactor)
            jimmy.y = 495*scaleFactor;
		directionV = "down";
	}
	
	if (40 in keysDown) { // Player holding down
		//jimmy.y += jimmy.speed * modifier;
        update_time=true;
		directionV="down";
		introStop=true;
	}
	if (37 in keysDown) { // Player holding left
        update_time=true;
		jimmy.x -= jimmy.speed * modifier;
		directionH="left";
		introStop=true;
	}
	if (39 in keysDown) { // Player holding right
        update_time=true;
		jimmy.x += jimmy.speed * modifier;
		directionH="right";
		introStop=true;
	}

    if(update_time)
        countDown(Math.round(modifier*100));

    updateCollision();
};

// Draw everything
var render = function () {
	if (introStop==false && introReady) {
		ctx.drawImage(introImage, 0, 0);
	}
	else {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}

		if (doorReady) {
			ctx.drawImage(doorImage, door.x, door.y);
		}

        // draw points
		if (pointReady) {
            for(var i = 0; i < points.length; i++) {
                if(points[i].life)
                    ctx.drawImage(pointImage, points[i].x, points[i].y);
            }
		}

		if (directionV=="down" && directionH=="right" && jimmy_rightReady) {
			ctx.drawImage(jimmy_rightImage, jimmy.x, jimmy.y);
		}
		if (directionV=="down" && directionH=="left" && jimmy_leftReady) {
			ctx.drawImage(jimmy_leftImage, jimmy.x, jimmy.y);
		}
		if (directionV=="up" && directionH=="right" && jimmy_right_flyReady) {
			ctx.drawImage(jimmy_right_flyImage, jimmy.x, jimmy.y);
		}
		if (directionV=="up" && directionH=="left" && jimmy_left_flyReady) {
			ctx.drawImage(jimmy_left_flyImage, jimmy.x, jimmy.y);
		}

		// Score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "16px Arial Black";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Points ", 612*scaleFactor, 457*scaleFactor);
		
		ctx.font = "50px Arial Black";
		ctx.fillText(pointsCaught, 690*scaleFactor, 415*scaleFactor);

		// Timer
		ctx.font = "16px Arial Black";
		ctx.fillText("Timer ", 603*scaleFactor, 495*scaleFactor);
		
		ctx.font = "20px Arial Black";
		ctx.fillText(time_display, 603*scaleFactor, 515*scaleFactor);

		// Finish Messages
		if (game_finished) {
			display_msg="Outstanding!!!";
			if(seconds>15)display_msg="Nice, now try 15 sec.";
			if(pointsCaught<10)display_msg="Get more gold!";
			
			ctx.fillStyle = "rgb(251, 0, 0)";
			ctx.font = "30px Arial Black";
			ctx.fillText(display_msg, 322*scaleFactor, 270*scaleFactor);
			
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "16px Arial Black";
			ctx.fillText("Press SPACE to reset.", 400*scaleFactor, 320*scaleFactor);
		};
	};
};

var AABB = function(obj1, obj2) {
    if(obj1.x > obj2.x+obj2.width)
        return false;
    else if(obj1.x+obj1.width < obj2.x)
        return false;
    else if(obj1.y > obj2.y+obj2.height)
        return false;
    else if(obj1.y+obj1.height < obj2.y)
        return false;

    return true;
}

var updateCollision = function() {
    // collide with points
    for(var i = 0; i < points.length; i++) {
        if(AABB(jimmy, points[i]) && points[i].life) {
            points[i].life = false;
            pointsCaught++;
            break;
        }
    }

    // collide with the game boundary
    if(jimmy.x <= 0)
        jimmy.x = 0;
    else if(jimmy.x+jimmy.width >= canvas.width)
        jimmy.x = canvas.width-jimmy.width;
    if(jimmy.y <= 0)
        jimmy.y = 0;


    // collide with walls
    for(var i = 0; i < walls.length; i++) {
        var jimmyCenterX = jimmy.x+jimmy.width/2;
        var jimmyCenterY = jimmy.y+jimmy.height/2;

        var wallCenterX = walls[i].x+walls[i].width/2;
        var wallCenterY = walls[i].y+walls[i].height/2;

        var diffX = Math.abs(jimmyCenterX - wallCenterX);
        var diffY = Math.abs(jimmyCenterY - wallCenterY);

        var xSum = jimmy.width/2 + walls[i].width/2;
        var ySum = jimmy.height/2 + walls[i].height/2;

        if(diffX < xSum) {
            if(diffY < ySum) {
                var penX = xSum-diffX;
                var penY = ySum-diffY;

                if(penX < penY) {
                    jimmy.x += penX*(jimmyCenterX > wallCenterX ? 1 : -1);
                }
                else if(penY < penX) {
                    jimmy.y += penY*(jimmyCenterY > wallCenterY ? 1 : -1);
                }
            }
        }
    }

    // collide with the door
    if(AABB(jimmy, door)) {
		jimmy_rightReady=false;
		jimmy_leftReady=false;
		jimmy_right_flyReady=false;
		jimmy_left_flyReady=false;
        jimmy_life=false;
		game_finished=true;
    }
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
init();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible

var milisec = 0;
var seconds = 0;   // set the seconds
var minutes = 0;   // set the minutes
var hours = 0;
function countDown(delta) {
	milisec += delta;
	if (milisec >= 100) { milisec=0; seconds += 1; } 
	if (seconds >= 60) { seconds = 0; minutes += 1;}
	if (minutes >= 60) { minutes=0; hours += 1; } 
	writeTime(hours,minutes,seconds,milisec);
	//SD=window.setTimeout("countDown();", 1);
};
function writeTime(hours,minutes,seconds,milisec){
	milisec = milisec<=9 ? "0" + milisec : milisec;
	seconds = seconds<=9 ? "0" + seconds : seconds;
	minutes = minutes<=9 ? "0" + minutes : minutes;
	hours = hours<=9 ? "0" + hours : hours;

	time = hours + ":" + minutes + ":" + seconds + ":" + milisec;
	time_display = time;
};
//window.clearTimeout(SD); 
/*function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {window.onload = func;} 
	else {window.onload = function() {if (oldonload) {oldonload();}func();}}
}
addLoadEvent(function() {countDown();});*/
