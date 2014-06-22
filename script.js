// initialise the canvas
var gameCanvas;

// create the global image objects
var avatarImage = new Image();
avatarImage.src = 'images/avatar.png';
var enemyImage = new Image();
enemyImage.src = 'images/enemy.png';

// player & enemy positions
var enemyXPositions = [];
var enemyYPositions = [];
var avatarX = 0;
var avatarY = 0;

// scores
var ticksSurvived = 0;
var mostTicksSurvived = 0;



// update the canvas variable on load
function init() {
    gameCanvas = document.getElementById('gameCanvas');
    
    // check for high score in local storage
    if (localStorage.getItem('bestScore')){
        mostTicksSurvived = localStorage.getItem('bestScore');
        updateScore();
    }
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


function startNewGame(){
    enemyXPositions = [];
    enemyYPositions = [];
    ticksSurvived = 0;
    clicks = 0;
}


function handleTick (){
    
    // force canvas to redraw
    gameCanvas.width = 500;
    
    gameCanvas.getContext('2d').drawImage(avatarImage, avatarX, avatarY);
    
    updateScore();
    
    // generate a new enemy
    if (Math.random() < 1/20){
        enemyYPositions.push(-60);
        enemyXPositions.push(Math.random() * 500);
    }
    
    // update enemy position and add to canvas
    for(i = 0; i <= enemyXPositions.length; i++){
        enemyYPositions[i] += 1;
        gameCanvas.getContext('2d').drawImage(enemyImage, enemyXPositions[i], enemyYPositions[i]);
    }
    
    checkColision();
    
    ticksSurvived++;
}


function updateScore(){
    // add scores to the canvas
    gameCanvas.getContext('2d').font = '18px Impact';
    gameCanvas.getContext('2d').textBaseline = 'top';
    gameCanvas.getContext('2d').fillText('Score: ' + ticksSurvived, 3, 0);
    gameCanvas.getContext('2d').fillText('Best Score: ' + mostTicksSurvived, 3 ,20);
    
    // display instructions if theres no score
    if(ticksSurvived === 0){
        gameCanvas.getContext('2d').fillText('Click to start', 200 ,190);
    }
}


function newHighScore(){
    alert('new high score! ' + ticksSurvived + ' ticks survived.');
    mostTicksSurvived = ticksSurvived;

    // store new high score in local storage
    localStorage.setItem('bestScore', mostTicksSurvived);
    
    startNewGame();
}


function checkColision(){
    
    // collision detection
    for(i = 0; i <= enemyXPositions.length; i++){
        if ((avatarX < enemyXPositions[i] && enemyXPositions[i] < avatarX + 30) || (enemyXPositions[i] < avatarX && avatarX < enemyXPositions[i] + 30)) {
            if ((avatarY < enemyYPositions[i] && enemyYPositions[i] < avatarY + 33) || (enemyYPositions[i] < avatarY && avatarY < enemyYPositions[i] + 30)){
                if (ticksSurvived > mostTicksSurvived){
                    newHighScore();                    
                } else {
                    alert('You\'ve hit something. Ticks survived: ' + ticksSurvived);
                    startNewGame();
                }
                
            }
        }
    }
}

// -Game speeds up on second click
//