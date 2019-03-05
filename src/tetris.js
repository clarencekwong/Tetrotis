document.addEventListener('DOMContentLoaded', e=> {
  let tetrisGrid = document.querySelector('.tetris-grid')
  let allTetromino = [tshape,line,square,jshape,lshape,sshape,zshape]
  let currentPiece = null
  let width = 10
  let height = 20
  let colors = ['red','blue','orange','yellow','green', 'purple', 'gold', 'silver', 'cyan', 'black', 'grey']
  let move = 0
  let state = 0
  let direction = ''
  let occupiedBlocks = new Array()


  function checkKey(e) {
      e.preventDefault();
      switch (e.keyCode) {
        case 40:
          direction = 'down'
          break
        case 37:
          direction = 'left'
          break
        case 38:
          rotateTetromino()
          break
        case 39:
          direction = 'right'
          break
      }
      renderTetromino();
  }

  function rotateTetromino() {
    clearCurrent();
    direction = 'rotate'
    if (currentPiece.shape.rotation < currentPiece.shape.tetroshape.length - 1) {
      currentPiece.shape.rotation++
    } else {
      currentPiece.shape.rotation = 0
    }
    renderTetromino();
    direction = ''
  }

  function collision(xVal,yVal) {
    let tetromino = currentPiece.shape.tetroshape[currentPiece.shape.rotation]
    let location = currentPiece.location

    let xArray = []
    let yArray = []
    for(let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j< tetromino.length; j++) {
        let x = tetromino[j][0] + location[0] + xVal
        let y = tetromino[j][1] + location[1] + yVal
        // debugger
        if (x === (-1)) {
          direction = ''
          return false
        } else if (y === (-1)) {
          direction = ''
          return false
        } else if (x === (width)) {
          direction = ''
          return false
        } else if (y === (height)) {
          createTetromino()
          direction = ''
          return false
        } else if ((document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList[1])) {
          createTetromino()
          return false
        }
      }
    }
    return true
  }

  function renderTetromino() {
    // debugger
    let tetromino = currentPiece.shape.tetroshape[currentPiece.shape.rotation]
    let location = currentPiece.location
    // debugger
    // console.log(location)
    clearCurrent();
    // based on direction of block, set the offset
    if (direction=="down" && collision(0,1)) {
      currentPiece.location[1]++
      direction = ''
    } else if (direction=="left" && collision(-1,0)) {
      currentPiece.location[0]--
      direction = ''
    }
    else if (direction=="right" && collision(1,0)) {
      currentPiece.location[0]++
      direction = ''
    }
    else if (direction=="" && collision(0,1)) {
      currentPiece.location[1]++
      direction = ''
    }
    // redraw the shape onto the board
    for(let i = 0; i < tetromino.length; i++) {
      let x = tetromino[i][0] + location[0]
      let y = tetromino[i][1] + location[1]
      let cell = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]')
      cell.classList.add('filled')
      cell.style.backgroundColor = currentPiece.color

    }

    // currentPiece.indexes = getBlockNumbers(currentPiece.shape, currentPiece.location);
}

  function clearCurrent() {
    // reset all blocks
    let shape = currentPiece.shape.tetroshape[currentPiece.shape.rotation];
    let location = currentPiece.location;

    for(let i = 0; i < shape.length; i++)
    {
        let x = shape[i][0] + location[0]
        let y = shape[i][1] + location[1]
        let block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]')
        block.classList.remove('filled')
        block.style.backgroundColor = ""
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
        col.innerHTML = "0 : " + counter
        row.appendChild(col)
        counter++
      }
      tetrisGrid.appendChild(row)
    }
  }

  function createTetromino() {
      let randomTetromino = Math.floor(Math.random() * allTetromino.length)
      let randomRotation = Math.floor(Math.random() * allTetromino[randomTetromino].length)
      let randomColor = Math.floor(Math.random() * colors.length)
      let center = Math.floor(width / 2) - 1
      let shape = allTetromino[randomTetromino][randomRotation]
      let location = [center, 0]

      currentPiece = {
          shape: {
            tetroshape: allTetromino[randomTetromino],
            rotation: randomRotation
          },
          color: colors[randomColor],
          location: location,
          // indexes: getBlockNumbers(shape, location)
      };
  }


  function start() {
      createBoard()
      createTetromino()
      renderTetromino()
      document.addEventListener('keydown', e => {
        if ((e.keyCode == '40') || (e.keyCode == '37') || (e.keyCode == '39') || (e.keyCode == '38')) {
          checkKey(e)
        }
      })
      setInterval(renderTetromino, 750)
  }

  start()
})
