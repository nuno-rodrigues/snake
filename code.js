var area 					= document.getElementById('area'),
	piece 					= document.getElementById('piece'),
	totalPieces 			= document.getElementById('totalPieces'),
	addPiece 				= document.getElementById('add-piece');
	info 					= document.getElementById('info');
	points					= 0;
	maxValue 				= area.offsetWidth - piece.offsetWidth,
	keysPressed 			= {},
	distancePerIteration 	= piece.offsetWidth,
	direction				= 'start',
	speedMove				= '300',
	gameStatus 				= 0,
	snakeElement			= {},
	snakeArray				= [],
	moveLeft				= 0,
	moveDown				= 0;

document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e){
	var currentPositionLeft = piece.offsetLeft,
		currentPositionTop = piece.offsetTop,
		keyCode = e.keyCode;
	
	if (keyCode == 39){ // right	
		if (currentPositionLeft < maxValue){
			if (direction != 'left'){
				direction = 'right';
				movePiece();
			}
		}
	} else if (keyCode == 37){ // right
		if (currentPositionLeft > 0){
			if (direction != 'right'){
				direction = 'left';
				movePiece();
			}
		}
	} else if (keyCode == 38){ // up
		if (currentPositionTop > 0){
			if (direction != 'down'){
				direction = 'up';	
				movePiece();
			}
		}
	} else if (keyCode == 40){ // down
		if (currentPositionTop < maxValue){
			if (direction != 'up'){
				direction = 'down';
				movePiece();
			}
		}
	} else if (keyCode == 13){ // enter
		location.reload();
	} else { // other keys
		// do nothing
	}
}

// Detect the collision of snake and elements
function detectCollision(){
	if (piece.offsetTop == addPiece.offsetTop && piece.offsetLeft == addPiece.offsetLeft){
		points 		= points + 1;
		var clone 	= piece.cloneNode(true);
		clone.id 	= piece.id + (points-1);
		area.appendChild(clone);
		newPosition();
	}
}

// Set position of the new element to catch
function newPosition(){
	var topRandom 	= Math.floor(Math.random() * distancePerIteration + 1) * distancePerIteration,
		leftRandom 	= Math.floor(Math.random() * distancePerIteration + 1) * distancePerIteration;
	
	addPiece.style.top 		= topRandom + 'px';
	addPiece.style.left 	= leftRandom + 'px';
	totalPieces.innerHTML 	= 'Total: ' + points;
}

// Move snake
function movePiece(){
	var currentPositionLeft = piece.offsetLeft;
		currentPositionTop 	= piece.offsetTop;

	if (gameStatus != 1){ // finish game
		if (direction === 'left' || direction === 'up'){
			if (currentPositionLeft <= distancePerIteration ||
				currentPositionTop <= distancePerIteration) {
				loseInfo();
			}
		} else if (direction === 'right' || direction === 'down' || direction === 'start'){
			if (currentPositionLeft > maxValue-distancePerIteration*2 ||
				currentPositionTop > maxValue-distancePerIteration*2) {
				loseInfo();
			}
		}
		addPosToArray(direction, points);
		detectCollision();
	}
}

function addPosToArray(direction, points){
	if (direction === 'start' || direction === 'right'){
		moveLeft = moveLeft + distancePerIteration;
	} else if (direction === 'down'){
		moveDown = moveDown + distancePerIteration;
	} else if (direction === 'left'){
		moveLeft = moveLeft - distancePerIteration;
	} else if (direction === 'up'){
		moveDown = moveDown - distancePerIteration;
	}

	piece.style.left = moveLeft+"px";
	piece.style.top  = moveDown+"px";

	snakeElement = {left: moveLeft, top: moveDown};
	snakeArray.push(snakeElement);
	
	if (snakeArray.length > points + 2){
		snakeArray.shift();
	}

	if (points > 0) {
		for (let i = 0; i < points; i++) {
			var clone = document.getElementById('piece' + i);
			clone.style.left 	= snakeArray[i+1].left + 'px';
			clone.style.top 	= snakeArray[i+1].top + 'px';	
		}
	}

	console.log(snakeArray);
}

// Lose information
function loseInfo(){
	info.innerHTML 	= "You Lose !!! <a href='index.html'>Retry</a>";
	gameStatus 		= 1;
	clearInterval(moveInterval);
}

window.addEventListener('load', function (){
	newPosition();
}, false);

var moveInterval = setInterval(function(){ movePiece() }, speedMove);