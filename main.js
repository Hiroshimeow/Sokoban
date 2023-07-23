class BoxGame {
  constructor() {
    this.can1 = document.getElementById("canvas1");
    this.can2 = document.getElementById("canvas2");
    this.context1 = this.can1.getContext("2d");
    this.context2 = this.can2.getContext("2d");
    this.nowLevel = [];
    this.boxs = [];
    this.balls = [];
    this.walls = [];
    this.blocks = [];
    this.me;
    this.time = 0;
    this.level = 0;
    this.changeX = 0;
    this.changeY = 0;
    this.timeOut = true;
    this.complete = 0;
    this.gameEnd = false;
  }
}

window.onload = function () {
  const backgroundMusic = document.getElementById("background-music");
  bg = new BoxGame();
  let nuclear = new Image();
  nuclear.src = "assets/nuclear.png";
  let can1 = document.getElementById("canvas1");
  let can2 = document.getElementById("canvas2");
  let context1 = can1.getContext("2d");
  let context2 = can1.getContext("2d");
  let nowLevel = [];
  let boxs = [];
  let balls = [];
  let walls = [];
  let blocks = [];
  let me;
  let time = 0;
  let level = 0;
  let changeX = 0;
  let changeY = 0;
  let timeOut = true;
  let complete = 0;
  let gameFrame = 0;
  let gameSpeed = 6;
  let gameEnd = false;
  let animEnd = 0

  setItem();

  setInterval(function () {
    gameFrame++;
    context2.clearRect(0, 0, can2.width, can2.height);
    drawMap();
    drawItem();
    key();
    win();
    console.log(gameEnd);
  }, 20);
  function drawMap() {
    let block = new Image();
    let ball = new Image();
    block.src = "assets/123.png";
    // ball.src = "assets/yelloball.png";
    for (let i = 0; i < levels[level].length; i++) {
      for (let j = 0; j < levels[level][i].length; j++) {
        context1.beginPath();
        context1.drawImage(block, 35 * i, 35 * j, 35, 35);
      }
    }
  }
  //   console.log(levels[0][0].length);

  function setItem() {
    
    for (let i = 0; i < levels[level].length; i++) {
      nowLevel[i] = [];
      for (let j = 0; j < levels[level][i].length; j++) {
        nowLevel[i][j] = levels[level][i][j];
      }
    }
    
    boxs = [];
    balls = [];
    walls = [];
    blocks = [];
    me = null;
    time = 0;
    changeX = 0;
    changeY = 0;
    timeOut = true;
    complete = 0;

    for (let i = 0; i < nowLevel.length; i++) {
      for (let j = 0; j < nowLevel[i].length; j++) {
        block = {
          x: i * 35,
          y: j * 35,
          pic: new Image(),
        };
        block.pic.src = "assets/123.png";
        blocks.push(block);

        if (nowLevel[i][j] == 1) {
          newWall = {
            x: i * 35,
            y: j * 35,
            pic: new Image(),
            realX: i,
            realY: j,
          };
          newWall.pic.src = "assets/wall.png";
          walls.push(newWall);
          // console.log(walls)
        }

        if (nowLevel[i][j] == 3) {
          aBox = {
            x: i * 35,
            y: j * 35,
            pic: new Image(),
            waterBox: new Image(),
            realX: i,
            realY: j,
          };
          aBox.pic.src = "assets/ice.png";
          aBox.waterBox.src = "assets/Ball/ball.png";
          boxs.push(aBox);
        }

        if (nowLevel[i][j] == 2) {
          ball = {
            x: i * 35,
            y: j * 35,
            fire: new Image(),
          };

          ball.fire.src = "assets/Fire/fire.png";
          balls.push(ball);
        }

        if (nowLevel[i][j] == 4) {
          me = {
            x: i * 35,
            y: j * 35,
            role: new Image(),
            walkX: 0,
            walkY: 0,
            realX: i,
            realY: j,
          };
          // me.role.src = "assets/me.png";
          me.role.src = "assets/girl.png";
        }
      }
    }
  }
 
  function drawLine(x) { 
    
    let i = 0;
    while (block[i] && gameEnd === true) {
      context1.beginPath();
      context1.drawImage(blocks[i].pic, blocks[i].x, blocks[i].y, 35, 35);
    }

    let position = Math.floor(gameFrame / gameSpeed) % 6;

    if (gameEnd === false){
      while (balls[i]) {
        if (balls[i].y / 35 == x) {
          context2.beginPath();
  
          // context2.drawImage(balls[i].pic, balls[i].x + 3, balls[i].y);
          for (j = 0; j < 6; j++) {
            context2.drawImage(
              ball.fire,
              position * 128, //x của ảnh nơi bắt đầu vẽ
              0, //y của ảnh
              128, //kích thước nhân vật trong ảnh
              128, //kích thước y
              balls[i].x - 18,
              balls[i].y - 30,
              70,
              60
            );
          }
        }
        i++;
      }
    }

    i = 0;
    while (walls[i]) {
      if (walls[i].realY == x) {
        context2.beginPath();
        context2.drawImage(walls[i].pic, walls[i].x, walls[i].y - 10);
      }
      i++;
    }
    i = 0;

    // console.log(balls[0].x/35,balls[0].y/35);
    // console.log(boxs[0].x/35,boxs[0].y/35);
    // console.log(boxs[0].y/35);
    
    while (boxs[i] && gameEnd === false) {
      bl = boxs.length;
      if (boxs[i].realY == x) {
        for (let g = 0; g < boxs.length; g++) {
          if ((boxs[i].x == balls[g].x) & (boxs[i].y == balls[g].y)) {
            for (j = 0; j < 4; j++) {
              context2.beginPath();
              context2.drawImage(
                aBox.waterBox,
                (Math.floor(gameFrame / gameSpeed) % 4) * 182, //x của ảnh nơi bắt đầu vẽ
                226 * 1, //y của ảnh
                150, //kích thước nhân vật trong ảnh
                150, //kích thước y
                boxs[i].x - 19,
                boxs[i].y - 19,
                65,
                65
              );
            }
            break
          } else {
            context2.beginPath();
            context2.drawImage(boxs[i].pic, boxs[i].x, boxs[i].y - 10);
          }
        }
      }
      i++;
    }

    // i = 0;
    if (me.realY == x) {
      // context2.beginPath();
      // context2.drawImage(
      //   me.role,
      //   me.walkX, //sx
      //   me.walkY, //sy
      //   100, //sWidth
      //   100, //sHeight
      //   me.x - 18, //dx
      //   me.y - 55, //dy
      //   70, //dWidth
      //   80 //Height

      context2.beginPath();
      context2.drawImage(
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        me.role,
        me.walkX, //sx
        me.walkY, //sy
        64, //sWidth
        128, //sHeight
        me.x - 4, //dx
        me.y - 50, //dy
        49, //dWidth
        100 //Height
      );
    }
  }
  function drawItem() {
    for (let i = 0; i < nowLevel.length; i++) {
      drawLine(i);
    }
  }

  document.onkeydown = function (event) {
    if (time == 0) {
      switch (event.keyCode) {
        case 65: //a
          changeX = -1;
          me.walkY = 128;
          break;
        case 87: //w
          changeY = -1;
          me.walkY = 384;
          break;
        case 68:
          changeX = 1; //d
          me.walkY = 256;
          break;
        case 83: //s
          changeY = 1;
          me.walkY = 0;
          break;
      }
    }
  };

  //key and logic for box move
  function key() {
    if (changeX != 0 || changeY != 0) {
      if (
        nowLevel[me.realX + changeX][me.realY + changeY] == 0 || //fire or none
        nowLevel[me.realX + changeX][me.realY + changeY] == 2
      ) {
        me.y += 5 * changeY;
        me.x += 5 * changeX;
      } else if (nowLevel[me.realX + changeX][me.realY + changeY] == 3) {
        //box
        if (
          nowLevel[me.realX + 2 * changeX][me.realY + 2 * changeY] == 0 ||
          nowLevel[me.realX + 2 * changeX][me.realY + 2 * changeY] == 2
        ) {
          // console.log(me.realX);

          me.x += 5 * changeX;
          me.y += 5 * changeY;
          for (let i = 0; i < boxs.length; i++) {
            if (
              boxs[i].realX == me.realX + changeX &&
              boxs[i].realY == me.realY + changeY
            ) {
              boxs[i].x += 5 * changeX;
              boxs[i].y += 5 * changeY;
            }
          }
        }
      }
      time += 5;
      if (time >= 7) {
        me.walkX = 64; //100
      }
      if (time >= 10) {
        me.walkX = 128;
      }
      if (time >= 13) {
        me.walkX = 192;
      }
      if (time >= 16) {
        me.walkX = 256;
      }
      if (time >= 19) {
        me.walkX = 320;
      }
      if (time >= 21) {
        me.walkX = 384;
      }
      if (time >= 24) {
        me.walkX = 448;
      }
      if (time >= 35) {
        me.walkX = 320;

        time = 0;
        if (
          nowLevel[me.realX + changeX][me.realY + changeY] != 1 &&
          nowLevel[me.realX + changeX][me.realY + changeY] != 3
        ) {
          nowLevel[me.realX][me.realY] = 0;
          nowLevel[me.realX + changeX][me.realY + changeY] = 4;
          me.realX += changeX;
          me.realY += changeY;
        } else if (nowLevel[me.realX + changeX][me.realY + changeY] == 3) {
          if (
            nowLevel[me.realX + 2 * changeX][me.realY + 2 * changeY] == 0 ||
            nowLevel[me.realX + 2 * changeX][me.realY + 2 * changeY] == 2
          ) {
            for (let i = 0; i < boxs.length; i++) {
              if (
                boxs[i].realX == me.realX + changeX &&
                boxs[i].realY == me.realY + changeY
              ) {
                boxs[i].realY += changeY;
                boxs[i].realX += changeX;
              }
            }
            nowLevel[me.realX + 2 * changeX][me.realY + 2 * changeY] = 3;
            nowLevel[me.realX + changeX][me.realY + changeY] = 4;
            nowLevel[me.realX][me.realY] = 0;
            me.realY += changeY;
            me.realX += changeX;
          }
        }
        changeX = 0;
        changeY = 0;
        timeOut = true;
      }
    }
  
  }
  
  
  function win() {
    let resetXAnim
    complete = 0;
    for (let i = 0; i < balls.length; i++) {
      for (let j = 0; j < boxs.length; j++) {
        if (
          balls[i].x == boxs[j].realX * 35 &&
          balls[i].y == boxs[j].realY * 35
        ) {
          complete++;
        }
      }
    }
    if (complete == balls.length) {
      gameEnd = true
      // console.log(gameEnd);
      
    }
    if (gameEnd === true){
      animEnd++


      for (j = 0; j < boxs.length; j++) {
        context2.beginPath();
        resetXAnim = Math.floor(gameFrame / 5) % 25
        context2.drawImage(
          nuclear,
          (resetXAnim % 25) * 256,
          0,
          256,
          256,
          boxs[j].x - 55,
          boxs[j].y - 75,
          150,
          150
        ); 
      } 
      if (animEnd > 100){
        level++;
        setItem();
        animEnd = 0
        gameEnd = false
        resetXAnim = 0
      }
    }

    context1.fillStyle = "rgba(255,255,255,1)";
    context1.font = "bold 30px cursive";
    let level2 = level + 1;
    context2.fillText("Level:" + level2, 20, 35);

    if (gameFrame>50){
      backgroundMusic.play(); 
    }
  }

  document.getElementById("jump").onclick = function () {
    console.log("jump click");
    backgroundMusic.pause();
  }; 
  document.getElementById("replay").onclick = function () {
    setItem();
  };
};
