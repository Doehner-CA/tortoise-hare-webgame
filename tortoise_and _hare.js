/**
 * 
 * @author Xiaodong Cao, 000911762
 */
let startBtn = document.getElementById('startBtn');
let board = document.getElementById('board');
let carrotButton = document.getElementById('carrot');
let distanceSpan = document.getElementById('distance');
let distance = 0;
let hareMovingInterval;
let gameInProgress = false;
let carrotThrown = false;

startBtn.addEventListener('click', function(){
	if (gameInProgress) return;//To prevent restart the game when game is in progress and cause any subsequent issuses, return nothing and exit.
	gameInProgress = true;
	countdown(3);
});

function countdown(sec){
	let countdownText = document.createElementNS("http://www.w3.org/2000/svg", "text");
	countdownText.setAttribute("x","350");
	countdownText.setAttribute("y","250");
	countdownText.setAttribute("font-size","100");
	countdownText.setAttribute("fill","red");
	board.appendChild(countdownText);

	let coundownInterval = setInterval(function(){
		if(sec > 0) {
			countdownText.textContent = sec;//We can also use innerText here, but textContent is better in general if we not consider the style info.
			sec--;
		}else {
			clearInterval(coundownInterval);
			board.removeChild(countdownText);
			startRace();
		}
	},1000);
}

function startRace(){
	let hare = document.getElementById('runningH');
	let tortoise = document.getElementById('runningT');

	if(!carrotThrown){
		hareMovingInterval = setInterval(function(){
			let hareX = parseInt(hare.getAttribute('x'));
			if(hareX < 750){
				hare.setAttribute('x',hareX + 15);
				checkWinner();
			}
		},100);
	}

	document.addEventListener('keydown',function(event){
		if(event.code === 'Space' && gameInProgress) {
			event.preventDefault();
			let tortoiseX = parseInt(tortoise.getAttribute('x'));
			if(tortoiseX < 750){
				tortoise.setAttribute('x',tortoiseX + 10);
				distance += 10;
				distanceSpan.innerText = distance;
				checkWinner();
			}
		}
	});
}

function checkWinner(){
	let hareX = parseInt(document.getElementById('runningH').getAttribute('x'));
	let tortoiseX = parseInt(document.getElementById('runningT').getAttribute('x'));

	if(hareX >= 750 || tortoiseX >= 750){
		clearInterval(hareMovingInterval);
		gameInProgress = false;
		let winner = hareX >= 750 ? 'Hare' : 'Tortoise';//Ternary Operator, condition ? 'Trur' : 'False'. equal to if(hareX >= 750){winner = Hare;} else{winner = Tortoise;}. only check hareX is because we already checked two condition in the first if statement.
		board.innerHTML += `<text x="250" y="250" font-size="100" fill="skyblue">${winner} wins!</text>`;//template literals and ${} interpolation.
		setTimeout(function(){//function, delay.
			document.querySelector('text[fill="skyblue"]').remove();//you can specify the text which include fill="green" and get it.
			resetGame();
		},3000);
	}
}

function resetGame(){
	document.getElementById('runningH').setAttribute('x',50);
	document.getElementById('runningT').setAttribute('x',50);
	let carrot = document.getElementById('runningCarrot');
	if(carrot) carrot.remove();//In html, every exist element is true, if it exist, then remove it.
	distance = 0;
	distanceSpan.innerText = distance;
	carrotThrown = false;
}

carrotButton.addEventListener('click', function(){
	if(!gameInProgress && !carrotThrown){//Check if the carrot hasn't been thrown yet
		carrotThrown = true;
		board.innerHTML += '<use x="110" y="150" id="runningCarrot" href="#carrotShape" />';
	}
})
