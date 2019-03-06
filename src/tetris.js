document.addEventListener('DOMContentLoaded', e=> {
  let tetrisGrid = document.querySelector('.tetris-grid')
  let allTetromino = [tshape,line,square,jshape,lshape,sshape,zshape]
  let width = 10
  let height = 20
  let colors = ['indianred','rosybrown','peachpuff','khaki','mediumseagreen', 'indigo', 'slateblue', 'plum', 'thistle', 'cornflowerblue', 'honeydew']
  let center = Math.floor(width / 2) - 1
  let selTetro = randomTetromino()
  let color = randomColor()
  let rotate = randomRotation(selTetro)
  let tetroPiece = new Tetromino(allTetromino[selTetro],color,rotate)
  let dropStart = Date.now();
  let gameOver = false;
<<<<<<< HEAD
  let scoreBoard = document.querySelector("#score")
=======
  let score = 0
>>>>>>> 25c88072526a6e9486cda12c911493cad6ebad37

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  function randomTetromino() {
    return Math.floor(Math.random() * allTetromino.length)
  }

  function randomRotation(selTetro) {
    return Math.floor(Math.random() * allTetromino[selTetro].length)
  }

  function Tetromino(tetromino,color,rotation) {
    this.tetromino = tetromino
    this.color = color
    this.rotation = rotation
    this.currentPiece = this.tetromino[this.rotation]
    this.location = [4, 0]
  }

  Tetromino.prototype.render = function() {
    for(let i = 0; i < this.currentPiece.length; i++) {
      let x = this.currentPiece[i][0] + this.location[0]
      let y = this.currentPiece[i][1] + this.location[1]
      let cell = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]')
      cell.classList.add('filled')
      cell.style.backgroundColor = this.color
    }
  }

  Tetromino.prototype.clear = function() {
    for(let i = 0; i < this.currentPiece.length; i++) {
        let x = this.currentPiece[i][0] + this.location[0]
        let y = this.currentPiece[i][1] + this.location[1]
        let cell = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]')
        cell.classList.remove('filled')
        cell.style.backgroundColor = ""
    }
  }

  Tetromino.prototype.moveDown = function() {
    this.clear()
    if (this.collision(0,1,this.currentPiece)) {
      // this.clear()
      this.location[1]++
      this.render()
    } else {
      this.render()
      this.lock()
      selTetro = randomTetromino()
      color = randomColor()
      rotate = randomRotation(selTetro)
      tetroPiece = new Tetromino(allTetromino[selTetro],color,rotate)
    }
  }

  Tetromino.prototype.moveLeft = function() {
    this.clear()
    if (this.collision(-1,0,this.currentPiece)) {
      // this.clear()
      this.location[0]--
      this.render()
    } else {
      this.render()
    }
  }

  Tetromino.prototype.moveRight = function() {
    this.clear()
    if (this.collision(1,0,this.currentPiece)) {
      // this.clear()
      this.location[0]++
      this.render()
    } else {
      this.render()
    }
  }

  Tetromino.prototype.rotate = function() {
    this.clear()
    let kick = 0;
    if (this.collision(0,0)){
        if (this.location[0] > width/2) {
            kick = -1
        } else {
            kick = 1
        }
    }
    if (this.collision(kick,0)) {
        this.clear()
        this.location[0] += kick;
        if ((this.rotation < this.tetromino.length - 1) ) {
          this.rotation++
        } else {
          this.rotation = 0
        }
        this.currentPiece = this.tetromino[this.rotation]
        this.render()
    }
    this.render()
  }

  Tetromino.prototype.collision = function(xVal,yVal,tetromino) {
    for(let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j< this.currentPiece.length; j++) {
        let x = this.currentPiece[j][0] + this.location[0] + xVal
        let y = this.currentPiece[j][1] + this.location[1] + yVal
        // debugger
        if (x === (-1)) {
          return false
        } else if (y === (-1)) {
          return false
        } else if (x === (width)) {
          return false
        } else if (y === (height)) {
          return false
        } else if ((document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList[1])) {
          return false
        }
      }
    }
    return true
  }

  Tetromino.prototype.lock = function() {
    let scoreboard = document.querySelector('#score')
    for (let i = 0; i < this.currentPiece.length; i++) {
      let x = this.currentPiece[i][0] + this.location[0]
      let y = this.currentPiece[i][1] + this.location[1]
      document.querySelector(`[data-x="${x}"][data-y="${y}"]`).dataset.state = "1"
      let tetrisGrid = document.querySelector('.tetris-grid')
      // debugger
    }
    let counter = 0
    let start = 0
    for (let c = 0; c < height; c++) {
      let filled = true
      for (let r = 0; r < width; r++) {
        let cell = document.querySelector(`[data-x="${r}"][data-y="${c}"]`)
        if (cell.dataset.state === '0') {
          filled = false
          break;
        }
      }
      if (filled) {
        if (start === 0) {
          start = c
        }
        counter++
        for (let i = 0; i < width; i++) {
          let cell = document.querySelector(`[data-x="${i}"][data-y="${c}"]`)
          cell.dataset.state = "0"
          cell.classList.remove('filled')
          cell.style.backgroundColor = "white"
          console.log('cleared a line')
        }
      }
    }
    if (counter > 0) {
      score += counter * 10
      scoreboard.innerHTML = score
    }

    for (let i = start-1; i>=0; i--) {
      for (let x = 0; x < width; x++) {
        // debugger
        let y = i + counter;
        let cell = document.querySelector(`[data-x="${x}"][data-y="${i}"]`)
        let nextCell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
        if (cell.dataset.state === "1") {
          nextCell.style.backgroundColor = cell.style.backgroundColor
          nextCell.dataset.state = "1"
          nextCell.classList.add('filled')
          cell.dataset.state = "0"
          cell.classList.remove('filled')
          cell.style.backgroundColor = "white"

        }
      }
    }
  }




  function createBoard() {
    let tetrisGrid = document.querySelector('.tetris-grid')
    tetrisGrid.innerHTML = ''
    counter = 0
    for (let y = 0; y < height; y++) {
      let row = document.createElement('div')
      row.className = 'row'
      row.dataset.row = y

      for (let x = 0; x < width; x++) {
        let col = document.createElement('div')
        col.className = 'cell'
        col.dataset.x = x
        col.dataset.y = y
        col.dataset.index = counter
        col.dataset.state = 0
        row.appendChild(col)
        counter++
      }
      tetrisGrid.appendChild(row)
    }
  }

  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 40:
        tetroPiece.moveDown()
        break
      case 37:
        tetroPiece.moveLeft()
        break
      case 38:
        tetroPiece.rotate()
        break
      case 39:
        tetroPiece.moveRight()
        break
    }
  })

  createBoard()
  tetroPiece.render()

  function start() {
      let now = Date.now();
      let delta = now - dropStart;
      if(delta > 1000){
          tetroPiece.moveDown();
          dropStart = Date.now();
      }
      if(!gameOver){
          requestAnimationFrame(start);
      }
  }

  start();
})
