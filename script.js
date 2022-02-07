var blockSize = 20;
var snakeBlocks = [];
var food = [];
var direction = '';
var jankyCounter = 0;
var score = 0;
var speed = 6;
var dead = false;
var badFood = [];

function setup() {
  dead = false;
  score = 0;
  speed = 6;
  createCanvas(600, 600);
  snakeBlocks = [[14, 15], [15, 15]];
  direction = 'right';
  frameRate(6);
  drawSnake(snakeBlocks);
  food = addFood(snakeBlocks);
  badFood = addBadFood(snakeBlocks);
  drawFood(food);
}

function draw() {
  clear();
  background(0);
  
  direction = checkKeys(direction);
  if (direction == "left") {
    snakeBlocks = moveLeft(snakeBlocks);
  } else if (direction == "up") {
    snakeBlocks = moveUp(snakeBlocks);
  } else if (direction == "down"){
    snakeBlocks = moveDown(snakeBlocks);
  }else{
    snakeBlocks = moveRight(snakeBlocks);
  }  
  if(!dead){
    frameRate(speed);
  }


  drawScore(score, snakeBlocks);
  drawFood(food);
  drawBadFood(badFood);
  drawSnake(snakeBlocks);
}

function drawScore(score, snakeBlocks){
  fill(255);
  textSize(20);
  if(snakeBlocks[snakeBlocks.length - 1][0] < 10 && snakeBlocks[snakeBlocks.length - 1][1] < 10){
    text( "Score: " + score, 500, 25);
  }else{
    text( "Score: " + score, 10, 25);
  }
}

function checkKeys(direction) {
  let newDirection = keyPress(direction);
  if (newDirection == "left" && direction == "right" || newDirection == "right" && direction == "left" || newDirection == "up" && direction == "down" || newDirection == "down" && direction == "up") {
    return direction;
  }
  return newDirection;
}

function keyPress() {
  let direction = "";
  if (keyCode === LEFT_ARROW) {
    direction = 'left';
  } else if (keyCode === RIGHT_ARROW) {
    direction = 'right';
  } else if (keyCode === UP_ARROW) {
    direction = 'up';
  } else if (keyCode === DOWN_ARROW) {
    direction = 'down';
  }
  return direction;
}

function drawSnake(snakeBlocks) {
  for (let i = 0; i < snakeBlocks.length; i++) {
    square(snakeBlocks[i][0] * 20, snakeBlocks[i][1] * 20, 19);
  }
}

function die() {
  dead = true;
  let button = createButton("Restart");
  console.log("no");
  let dieTxt = 'Bruh';
  fill(220, 20, 60);
  textSize(30);
  text(dieTxt, 255, 280);
  button.id = 'restart';
  button.size(200, 100);
  button.position(200, 320);
  button.style("font-family", "Bodoni");
  button.style("font-size", "48px");
  button.mouseClicked(restartGame);
  frameRate(0);
}

function restartGame() {
  var b = document.getElementsByTagName("button");
  b[jankyCounter].style.display = "none";
  setup();
  jankyCounter++;
}

function touchingSelf() {
  let newPos = [];
  if (direction == "right") {
    newPos = [snakeBlocks[snakeBlocks.length - 1][0] + 1, snakeBlocks[snakeBlocks.length - 1][1]];
  } else if (direction == "left") {
    newPos = [snakeBlocks[snakeBlocks.length - 1][0] - 1, snakeBlocks[snakeBlocks.length - 1][1]];
  } else if (direction == "up") {
    newPos = [snakeBlocks[snakeBlocks.length - 1][0], snakeBlocks[snakeBlocks.length - 1][1] - 1];
  } else if (direction == "down") {
    newPos = [snakeBlocks[snakeBlocks.length - 1][0], snakeBlocks[snakeBlocks.length - 1][1] + 1];
  }
  if (checkBody(snakeBlocks, newPos)) {
    die();
  }
}

function checkBody(snakeBlocks, newPos) {
  let check = 0;
  for (var i = 0; i < snakeBlocks.length; i++) {
    check = 0;
    for (var u = 0; u < 2; u++) {
      if (snakeBlocks[i][u] == newPos[u]) {
        check++;
     } 
    }
    if (check == 2) {
      return true;
    }
  }
  return false;
}

function touchingEdge(direction, snakeBlocks) {
  var newPos = [];
  if (direction == "right") {
    newPos = [snakeBlocks[snakeBlocks.length - 1][0] + 1, snakeBlocks[snakeBlocks.length - 1][1]];
  } else if (direction == "left") {
    newPos = [snakeBlocks[snakeBlocks.length - 1][0] - 1, snakeBlocks[snakeBlocks.length - 1][1]];
  } else if (direction == "up") {
    newPos = [snakeBlocks[snakeBlocks.length - 1][0], snakeBlocks[snakeBlocks.length - 1][1] - 1];
  } else if (direction == "down") {
    newPos = [snakeBlocks[snakeBlocks.length - 1][0], snakeBlocks[snakeBlocks.length - 1][1] + 1];
  }
  if (newPos[0] >= 30 || newPos[0] < 0 || newPos[1] >= 30 || newPos[1] < 0) {
    die();
  }
}

function checkFood(arr, direction, snakeBlocks) {
  if (!touchFood(arr, direction, snakeBlocks)) {
    snakeBlocks.shift();
  } else {
    food = addFood(snakeBlocks);
    score++;
  }
  return snakeBlocks;
}

function checkBadFood(arr, direction, snakeBlocks) {
  if (touchFood(arr, direction, snakeBlocks)) {
    badFood = addBadFood(snakeBlocks);
    speed *= 1.5;
  }
}

function moveRight(snakeBlocks) {
  if (touchingEdge("right", snakeBlocks) || touchingSelf()) {
    die();
  }
  var foreSquare = snakeBlocks[snakeBlocks.length - 1];

  snakeBlocks = checkFood(food, "right", snakeBlocks);
  checkBadFood(badFood, "right", snakeBlocks);
  snakeBlocks.push([foreSquare[0] + 1, foreSquare[1]]);
  return snakeBlocks;
}

function moveLeft(snakeBlocks) {
  if (touchingEdge("left", snakeBlocks) || touchingSelf()) {
    die();
  }
  snakeBlocks = checkFood(food, "left", snakeBlocks);
  checkBadFood(badFood, "left", snakeBlocks);
  var foreSquare = snakeBlocks[snakeBlocks.length - 1];
  snakeBlocks.push([foreSquare[0] - 1, foreSquare[1]]);
  return snakeBlocks;
}

function moveUp(snakeBlocks) {
  if (touchingEdge("up", snakeBlocks) || touchingSelf()) {
    die();
  }
  snakeBlocks = checkFood(food, "up", snakeBlocks);
  checkBadFood(badFood, "up", snakeBlocks);
  var foreSquare = snakeBlocks[snakeBlocks.length - 1];
  snakeBlocks.push([foreSquare[0], foreSquare[1] - 1]);
  return snakeBlocks;
}

function moveDown(snakeBlocks) {
  if (touchingEdge("down", snakeBlocks) || touchingSelf()) {
    die();
  }
  var foreSquare = snakeBlocks[snakeBlocks.length - 1];
  snakeBlocks = checkFood(food, "down", snakeBlocks);
  checkBadFood(badFood, "up", snakeBlocks);
  snakeBlocks.push([foreSquare[0], foreSquare[1] + 1]);
  return snakeBlocks;
}

function addFood(snakeBlocks) {
  var foodx = 0;
  var foody = 0;
  var check = true;
  var arr = [];
  while (check) {
    foodx = Math.floor(random(0, 30));
    foody = Math.floor(random(0, 30));

    for (var i = 0; i < snakeBlocks.length; i++) {
      if (snakeBlocks[i][0] == foodx && snakeBlocks[i][1] == foody) {
        break;
      } else if (snakeBlocks.length - 1 == i) {
        check = false;
      }
    }
  }
  arr = [foodx, foody];
  return arr;
}

function addBadFood(snakeBlocks) {
  var foodx = 0;
  var foody = 0;
  var check = true;
  var arr = [];
  while (check) {
    foodx = Math.floor(random(0, 30));
    foody = Math.floor(random(0, 30));

    for (var i = 0; i < snakeBlocks.length; i++) {
      if (snakeBlocks[i][0] == foodx && snakeBlocks[i][1] == foody) {
        break;
      } else if (snakeBlocks.length - 1 == i) {
        check = false;
      }
    }
  }
  arr = [foodx, foody];
  return arr;
}


function drawFood(foodPosition) {
  fill(50, 250, 50);
  square(foodPosition[0] * 20, foodPosition[1] * 20, 19);
  fill(255, 255, 255);
}

function drawBadFood(foodPosition) {
  fill(250, 50, 50);
  square(foodPosition[0] * 20, foodPosition[1] * 20, 19);
  fill(255, 255, 255);
}

function touchFood(food, direction, snakeBlock) {
  if (checkPositions(snakeBlocks, food)) {
    return true;
    console.log('true');
  }
  return false;
}

function checkPositions(snakeBlocks, arr) {
  let check = 0;
  for (var i = 0; i < 2; i++) {
    if (snakeBlocks[snakeBlocks.length - 1][i] == arr[i]) {
      check++;
    }
  }
  if (check == 2) {
    return true;
  }
  return false;
}