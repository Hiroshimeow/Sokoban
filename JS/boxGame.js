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
  }
}

window.onload = function () {
  bg = new BoxGame();
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
  setItem();

  setInterval(function () {
    context2.clearRect(0, 0, can2.width, can2.height);
    drawMap();
    drawItem();
    key();
    win();
  }, 20);
  function drawMap() {
    let block = new Image();
    let ball = new Image();
    block.src = "assets/123.png";
    ball.src = "assets/yelloball.png";
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
        console.log(levels[level][i][j]);
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
        }
        if (nowLevel[i][j] == 3) {
          aBox = {
            x: i * 35,
            y: j * 35,
            pic: new Image(),
            realX: i,
            realY: j,
          };
          aBox.pic.src = "assets/box.png";
          boxs.push(aBox);
        }
        if (nowLevel[i][j] == 2) {
          ball = {
            x: i * 35,
            y: j * 35,
            pic: new Image(),
          };
          ball.pic.src = "assets/yelloball.png";
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
          me.role.src = "assets/me.png";
        }
      }
    }
  }
  function drawLine(x) {
    let i = 0;
    while (block[i]) {
      context1.beginPath();
      context1.drawImage(blocks[i].pic, blocks[i].x, blocks[i].y, 35, 35);
    }
    while (balls[i]) {
      if (balls[i].y / 35 == x) {
        context2.beginPath();
        context2.drawImage(balls[i].pic, balls[i].x, balls[i].y);
      }
      i++;
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
    while (boxs[i]) {
      if (boxs[i].realY == x) {
        context2.beginPath();
        context2.drawImage(boxs[i].pic, boxs[i].x, boxs[i].y - 10); 
      }
      i++;
    }
    i = 0;
    if (me.realY == x) {
      context2.beginPath();
      context2.drawImage(
        me.role,
        me.walkX,
        me.walkY,
        100,
        100,
        me.x - 18,
        me.y - 65,
        70,
        90
      ); 
    }
  }
  function drawItem() {
    for (let i = 0; i < 16; i++) {
      drawLine(i);
    }
  }
  document.onkeydown = function () {
    if (time == 0) {
      switch (event.keyCode) {
        case 37:
          changeX = -1;
          me.walkY = 100;
          break;
        case 38:
          changeY = -1;
          me.walkY = 300;
          break;
        case 39:
          changeX = 1;
          me.walkY = 200;
          break;
        case 40:
          changeY = 1;
          me.walkY = 0;
          break;
      }
    }
  };

  function key() {
    if (changeX != 0 || changeY != 0) {
      if (
        nowLevel[me.realX + changeX][me.realY + changeY] == 0 ||
        nowLevel[me.realX + changeX][me.realY + changeY] == 2
      ) {
        me.y += 5 * changeY;
        me.x += 5 * changeX;
      } else if (nowLevel[me.realX + changeX][me.realY + changeY] == 3) {
        if (
          nowLevel[me.realX + 2 * changeX][me.realY + 2 * changeY] == 0 ||
          nowLevel[me.realX + 2 * changeX][me.realY + 2 * changeY] == 2
        ) {
          me.y += 5 * changeY;
          me.x += 5 * changeX;
          for (let i = 0; i < boxs.length; i++) {
            if (
              boxs[i].realX == me.realX + changeX &&
              boxs[i].realY == me.realY + changeY
            ) {
              console.log("changeBox");
              boxs[i].y += 5 * changeY;
              boxs[i].x += 5 * changeX;
            }
          }
        }
      }
      time += 5;
      if (time >= 7) {
        me.walkX = 100;
      }
      if (time >= 14) {
        me.walkX = 200;
      }
      if (time >= 21) {
        me.walkX = 300;
      }
      if (time >= 35) {
        me.walkX = 0;
        time = 0;
        if (
          nowLevel[me.realX + changeX][me.realY + changeY] != 1 &&
          nowLevel[me.realX + changeX][me.realY + changeY] != 3
        ) {
          nowLevel[me.realX][me.realY] = 0;
          nowLevel[me.realX + changeX][me.realY + changeY] = 4;
          me.realY += changeY;
          me.realX += changeX;
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
      level++;
      setItem();
    }
    context1.fillStyle = "rgba(255,255,255,1)";
    context1.font = "bold 30px cursive";
    let level2 = level + 1;
    context2.fillText("Level:" + level2, 10, 20);
  }
  document.getElementById("jump").onclick = function () {
    if (
      document.getElementById("qua").value > 0 &&
      document.getElementById("qua").value < 100
    ) {
      level = document.getElementById("qua").value;
      level--;
      setItem();
    } else {
      document.getElementById("qua").value = "num:from 0 to 99";
    }
  };
  document.getElementById("replay").onclick = function () {
    setItem();
  };
};
