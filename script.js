// initialise the canvas
var gameCanvas;


// create the global image objects
var avatarImage = new Image();
avatarImage.src = 'images/avatar.png';
var enemyImage = new Image();
enemyImage.src = 'images/enemy.png';


var enemyXPositions = [50, 120, 180, 350, 430];
var enemyYPositions = [0, -50, -75, -120, -250];
var avatarX = 0;
var avatarY = 0;


// update the canvas variable on load
function init() {
    gameCanvas = document.getElementById('gameCanvas');
}
document.addEventListener('DOMContentLoaded', init);


// called on canvas click event
function setUpGame() {
    
    gameCanvas.addEventListener("mousemove", handleMouseMovement);
    setInterval(handleTick, 25);
}


// update the gameCanvas on mouse move
function handleMouseMovement(mouseEvent) {
    avatarX = mouseEvent.offsetX;
    avatarY = mouseEvent.offsetY;
    
    //avatar is 30px wide and the enemy is at x=250, so I have to check whether 
	//mouseEvent.offsetX is within 30px either side of x=250 (i.e., from 220 to 280)
    
	//avatar is 33px tall, I have to check whether mouseEvent.offsetX 
	//is within 33px ABOVE y=150 but since enemy is only 30px tall, I also check whether 
	//mouseEvent.offsetX is within 30px BELOW y=150 therefore, I check from (117 to 180)
}

function handleTick (){
    
    // force canvas to redraw
    gameCanvas.width = 500;
    
    gameCanvas.getContext('2d').drawImage(avatarImage, avatarX, avatarY);
    
    // update enamy position and add to canvas
    for(i = 0; i <= enemyXPositions.length; i++){
        enemyYPositions[i] += 1;
        gameCanvas.getContext('2d').drawImage(enemyImage, enemyXPositions[i], enemyYPositions[i]);
    }
     
    for(i = 0; i <= enemyXPositions.length; i++){
        if ((avatarX < enemyXPositions[i] && enemyXPositions[i] < avatarX + 30) || (enemyXPositions[i] < avatarX && avatarX < enemyXPositions[i] + 30)) {
            if ((avatarY < enemyYPositions[i] && enemyYPositions[i] < avatarY + 33) || (enemyYPositions[i] < avatarY && avatarY < enemyYPositions[i] + 30)){
            
            alert('you hit something');
            }
        }
    }
}