var howManyDots = prompt("How many dots?");
var howManyMade = 0;

console.log(howManyDots);

var xLocs = new Array();
var yLocs = new Array();
var dXSpeed = new Array();
var dYSpeed = new Array();
var dotColor = new Array();

var moveTheDots = false;

var dotSize = 15;

var colors = ['Aquamarine', 'DodgerBlue', 'Cyan', 'Indigo', 'Gold', 'Silver', 'Black'];

var totalColors = colors.length;
console.log("The total number of colors is " + totalColors);

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');

var rect = canvas.getBoundingClientRect();

var canvasW = rect.right - rect.left;

var canvasH = rect.bottom - rect.top;

function frame() {
	if(moveTheDots === false) {
		clearInterval(id);
	} else {
		for(var i=0; i < xLocs.length; i++) {
		var theDX = dXSpeed[i];
		var theDY = dYSpeed[i];
		xLocs[i] += theDX;
		yLocs[i] += theDY;

		if(xLocs[i] < dotSize/2) {
			xLocs[i] = dotSize/2;
			dXSpeed[i] *= -1;
		}

		if(xLocs[i] > canvasW - dotSize/2) {
			xLocs[i] = canvasW - 1 - dotSize/2;
			dXSpeed[i] *= -1;
		}

		if(yLocs[i] < dotSize/2) {
			yLocs[i] = dotSize/2;
			dYSpeed[i] *= -1;
		}

		if(yLocs[i] > canvasH - dotSize/2) {
			yLocs[i] = canvasH - 1 - dotSize/2;
			dYSpeed[i] *= -1;
		}
		redrawScene();
	}
}
}

function moveEveryBody() {
	var id = setInterval(frame, 7);
}

function toggleDotMoving() {
	if(moveTheDots === false) {
		moveEveryBody();
		moveTheDots = true;
	} else {
		moveTheDots = false;
	}
}

function doReset() {
	alert("I'm going to do a reset");
}

function getMousePosition(canvas, event){
	var rect = canvas.getBoundingClientRect();
	var xL = event.clientX - rect.left;
	var yL = event.clientY - rect.top;

	return {
		x: xL,
		y: yL
	};
}

function addClick(x,y) {
	xLocs.push(Math.floor(x - (dotSize/2.0)));
	yLocs.push(Math.floor(y - (dotSize/2.0)));
	var dColor = Math.floor(Math.random() * colors.length);
	dotColor.push(dColor);
	var ranDX = Math.floor(Math.random() * 8) - 4;
	var ranDY = Math.floor(Math.random() * 8) - 4;
	dXSpeed.push(ranDX);
	dYSpeed.push(ranDY);
}

function redrawScene() {
	context.clearRect(0,0, context.canvas.width, context.canvas.height);
	for(var i=0; i < xLocs.length; i++) {
		context.beginPath();
		context.ellipse( 
			xLocs[i],
			yLocs[i],
			dotSize,
			dotSize,
			0,0,
			Math.PI*2
			);
		var whichColorNum = dotColor[i];
		context.fillStyle = colors[whichColorNum];
		context.fill();
		context.closePath();
	}
}

canvas.addEventListener( 'mousedown',
	function( event ) {
		var mousePos = getMousePosition(canvas, event);
		if(howManyMade < howManyDots) {
			addClick(mousePos.x, mousePos.y);
			howManyMade++;
			redrawScene();
		}

	}
);