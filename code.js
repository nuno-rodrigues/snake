var area 					= document.getElementById('area'),
	piece 					= document.getElementById('piece'),
	totalPieces 			= document.getElementById('totalPieces'),
	addPiece 				= document.getElementById('add-piece');
	info 					= document.getElementById('info');
	points					= 0;
	maxValueWidth			= area.offsetWidth - piece.offsetWidth,
	maxValueHeight			= area.offsetHeight - piece.offsetHeight,
	keysPressed 			= {},
	distancePerIteration 	= piece.offsetWidth,
	direction				= 'start',
	speedMove				= 400,
	increaseSpeed			= 30,
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

	removeFace(piece);
	movePiece();
	
	if (keyCode == 39){ // left
		if (currentPositionLeft < maxValueWidth){
			if (direction != 'left'){
				direction = 'right';
				piece.classList.add('left');
			}
		}
	} else if (keyCode == 37){ // right
		if (currentPositionLeft > 0){
			if (direction != 'right'){
				direction = 'left';
				piece.classList.add('right');
			}
		}
	} else if (keyCode == 38){ // up
		if (currentPositionTop > 0){
			if (direction != 'down'){
				direction = 'up';
				piece.classList.add('up');
			}
		}
	} else if (keyCode == 40){ // down
		if (currentPositionTop < maxValueHeight){
			if (direction != 'up'){
				direction = 'down';
				piece.classList.add('down');
			}
		}
	} else if (keyCode == 13){ // enter
		location.reload();
	} else { // other keys
		// do nothing
	}
}

// removes all faces states
function removeFace(element) {
	element.classList.remove('left');
	element.classList.remove('right');
	element.classList.remove('down');
	element.classList.remove('up');
	element.classList.remove('tail-up');
	element.classList.remove('tail-down');
	element.classList.remove('tail-left');
	element.classList.remove('tail-right');
	element.classList.remove('body-up');
	element.classList.remove('body-down');
	element.classList.remove('body-left');
	element.classList.remove('body-right');
}

// Detect the collision of snake and elements
function detectCollision(){
	if (piece.offsetTop == addPiece.offsetTop && piece.offsetLeft == addPiece.offsetLeft){
		points 		= points + 1;
		var clone 	= piece.cloneNode(true);
		clone.id 	= piece.id + (points-1);
		area.appendChild(clone);
		newPosition();
		if (piece == piece * 5) { // increase speed from 10 and 10 points
			moreSpeed();
		}
	}
}

// Increase speed in steps
function moreSpeed() {
	clearInterval(moveInterval);
	speedMove = speedMove - increaseSpeed;
	moveInterval = setInterval(function(){ movePiece() }, speedMove);
}

// Set position of the new element to catch
function newPosition(){
	var topRandom 	= Math.floor(Math.random() * distancePerIteration + 1) * distancePerIteration,
		leftRandom 	= Math.floor(Math.random() * distancePerIteration + 1) * distancePerIteration;

	if (topRandom > maxValueHeight){
		newPosition();
		return false;
	}
	
	addPiece.style.top 		= topRandom + 'px';
	addPiece.style.left 	= leftRandom + 'px';
	totalPieces.innerHTML 	= 'Hi-Score: ' + points;
}

// Move snake
function movePiece(){
	var currentPositionLeft = piece.offsetLeft;
		currentPositionTop 	= piece.offsetTop;
		
	if (gameStatus != 1){ // finish game
		if (direction === 'left' || direction === 'up'){
			console.log('area1');
			if (currentPositionLeft < distancePerIteration+10 ||
				currentPositionTop < distancePerIteration+10) {
				loseInfo();
			}
		} else if (direction === 'right' || direction === 'down' || direction === 'start'){
			console.log('area1');
			if (currentPositionLeft > maxValueWidth-distancePerIteration-10 ||
				currentPositionTop > maxValueHeight-distancePerIteration-20) {
				loseInfo();
			}
		}
		addPosToArray(direction, points);
		detectCollision();
	}
}

// Add positions of snake to array, once eat pieces add one more position to array
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
	
	// add current and previous positions of the snake and remove the first
	if (snakeArray.length > points + 2) {
		snakeArray.shift();
	}

	// after eat the first piece, we clone the snake and make the tail
	if (points > 0) {
		for (let i = 0; i < points; i++) {
			var clone = document.getElementById('piece' + i);
			clone.style.left 	= snakeArray[i+1].left + 'px';
			clone.style.top 	= snakeArray[i+1].top + 'px';	
			removeFace(clone);
			clone.classList.add('tail-'+direction);
		}
	}
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