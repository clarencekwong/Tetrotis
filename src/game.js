const allTetromino = {
  lshape1 : {block1 : [25, 25, "red", 100, 0], block2 : [25, 25, "red", 100, 25], block3 : [25, 25, "red", 100, 50], block4 : [25, 25, "red", 125, 50]},
  lshape2 : {block1 : [25, 25, "red", 100, 0], block2 : [25, 25, "red", 100, 25], block3 : [25, 25, "red", 100, 50], block4 : [25, 25, "red", 75, 50]},
  tshape : {block1 : [25, 25, "red", 100, 0], block2 : [25, 25, "red", 125, 25], block3 : [25, 25, "red", 100, 25], block4 : [25, 25, "red", 75, 25]},
  cube : {block1 : [25, 25, "red", 100, 0], block2 : [25, 25, "red", 100, 25], block3 : [25, 25, "red", 125, 0], block4 : [25, 25, "red", 125, 25]},
  line : {block1 : [25, 25, "red", 100, 0], block2 : [25, 25, "red", 125, 25], block3 : [25, 25, "red", 100, 25], block4 : [25, 25, "red", 75, 25]},
  sleft : {block1 : [25, 25, "red", 100, 0], block2 : [25, 25, "red", 100, 25], block3 : [25, 25, "red", 125, 0], block4 : [25, 25, "red", 75, 25]},
  sright : {block1 : [25, 25, "red", 100, 0], block2 : [25, 25, "red", 125, 0], block3 : [25, 25, "red", 125, 25], block4 : [25, 25, "red", 150, 25]}
}


function startGame() {
  myGameArea.start();
  // debugger
  // updateGameArea(currentPiece)
}

function setCurrentPiece() {
  return generateTetromino()
}





let myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 250
    this.canvas.height = 500
    this.context = this.canvas.getContext("2d")
    this.strokeStyle = 'black'
    this.lineWidth = 4
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    // debugger
    this.interval = setInterval(updateGameArea, 50);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function generateTetromino() {
  // let tetromino = {block1 : [25, 25, "red", 100, 0], block2 : [25, 25, "red", 125, 25], block3 : [25, 25, "red", 100, 25], block4 : [25, 25, "red", 75, 25]}
  let tetromino = randomTetromino(allTetromino)
  let tetro_array = []
  for (let tetro in tetromino) {
    let currentPiece = new Tetromino(tetromino[tetro][0],tetromino[tetro][1],tetromino[tetro][2],tetromino[tetro][3],tetromino[tetro][4])
    tetro_array.push(currentPiece)
  }
  return tetro_array
}

function randomTetromino(allTetromino) {
  let keys = Object.keys(allTetromino)
  // debugger
  return allTetromino[keys[ keys.length * Math.random() << 0]];
}

let currentPiece = setCurrentPiece()

function updateGameArea() {
  myGameArea.clear()
  // debugger
  if (currentPiece) {
    for (let piece in currentPiece) {
      if (currentPiece[0].y <= 475 && currentPiece[1].y <= 475 && currentPiece[2].y <= 475 && currentPiece[3].y <= 475 ) {
        currentPiece[piece].y += 25
        currentPiece[piece].generateToDom()
      } else {
        currentPiece[piece].generateToDom()
        // stop function
      }

      // if (currentPiece[piece].y < myGameArea.canvas.height -10) {x++}
     }
  }
}
