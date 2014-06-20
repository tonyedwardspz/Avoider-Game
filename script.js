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
     
    // collision detection
    for(i = 0; i <= enemyXPositions.length; i++){
        if ((avatarX < enemyXPositions[i] && enemyXPositions[i] < avatarX + 30) || (enemyXPositions[i] < avatarX && avatarX < enemyXPositions[i] + 30)) {
            if ((avatarY < enemyYPositions[i] && enemyYPositions[i] < avatarY + 33) || (enemyYPositions[i] < avatarY && avatarY < enemyYPositions[i] + 30)){
            
            alert('you hit something');
            }
        }
    }
}