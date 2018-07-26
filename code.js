console.log('dasdas');

var area 					= document.getElementById('area'),
	piece 					= document.getElementById('piece'),
	totalPieces 			= document.getElementById('totalPieces'),
	addPiece 				= document.getElementById('add-piece');
	points					= 0;
	maxValue 				= area.offsetWidth - piece.offsetWidth,
	keysPressed 			= {},
	distancePerIteration 	= piece.offsetWidth;

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
	var currentPositionLeft = piece.offsetLeft,
			currentPositionTop = piece.offsetTop,
			keyCode = e.keyCode;
	
	if (keyCode == 39) { // right	
		if (currentPositionLeft < maxValue) {
			piece.style.left = currentPositionLeft+distancePerIteration+"px";
		}
	} else if (keyCode == 37) { // right
		if (currentPositionLeft > 0) {
			piece.style.left = currentPositionLeft-distancePerIteration+"px";
		}
	} else if (keyCode == 38) { // up
		if (currentPositionTop > 0) {
			piece.style.top = currentPositionTop-distancePerIteration+"px"	
		}
	} else if (keyCode == 40) { // down
		if (currentPositionTop < maxValue) {
			piece.style.top = currentPositionTop+distancePerIteration+"px"
		}
	} else { // other keys
		// do nothing
	}
	detectCollision();
}

function detectCollision() {
	if (piece.offsetTop == addPiece.offsetTop && piece.offsetLeft == addPiece.offsetLeft) {
		newPosition();
	}
}

function newPosition() {
	var topRandom = Math.floor(Math.random() * distancePerIteration + 1) * distancePerIteration,
			leftRandom = Math.floor(Math.random() * distancePerIteration + 1) * distancePerIteration;
	
	addPiece.style.top = topRandom + 'px';
	addPiece.style.left = leftRandom + 'px';
	
	totalPieces.innerHTML = 'Total: ' + points;
	points++;
}

window.addEventListener('load', function () {
	newPosition();
}, false);