document.addEventListener('DOMContentLoaded', e=> {
  let tetrisGrid = document.querySelector('.tetris-grid')
  let allTetromino = new Array()
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
        case 39:
          direction = 'right'
          break
      }
      renderTetromino();
  }

  function createTetrominos() {
      let tshape = [[1, 0], [0,1], [1,1],[2,1]]
      let line = [[0, 0], [0, 1], [0, 2], [0, 3]]
      let square = [[0, 0], [0, 1], [1, 0], [1, 1]]
      let lr = [[2,0], [0, 1], [1, 1], [2,1]]
      let rl = [[0,0], [0, 1], [1, 1], [2,1]]
      let sshape = [[0,0], [1, 0], [1, 1], [2,1]]
      let zshape = [[2,0], [1, 0], [1, 1], [0,1]]
      allTetromino.push(tshape,line,square,lr,rl,sshape,zshape)
  }

  function renderTetromino() {
    let tetromino = currentPiece.shape;
    let location = currentPiece.location;
    console.log(location)
    clearCurrent();

    // based on direction of block, set the offset
    if (direction=="down")
      currentPiece.location[1]++;
    else if (direction=="left")
      currentPiece.location[0]--;
    else if (direction=="right")
      currentPiece.location[0]++;

    // redraw the shape onto the board
    for(let i = 0; i < tetromino.length; i++) {
        let x = tetromino[i][0] + location[0];
        let y = tetromino[i][1] + location[1];
        let cell = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
        cell.classList.add('filled');
        cell.style.backgroundColor = currentPiece.color;
    }

    // currentPiece.indexes = getBlockNumbers(currentPiece.shape, currentPiece.location);
}

  function clearCurrent() {
    // reset all blocks
    let shape = currentPiece.shape;
    let location = currentPiece.location;

    for(let i = 0; i < shape.length; i++)
    {
        let x = shape[i][0] + location[0];
        let y = shape[i][1] + location[1];
        let block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
        block.classList.remove('filled');
        block.style.backgroundColor="";
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
      let randomTetromino = Math.floor(Math.random() * allTetromino.length);
      let randomColor = Math.floor(Math.random() * colors.length);
      let center = Math.floor(width / 2) - 1;
      let shape = allTetromino[randomTetromino];
      let location = [center, 0];

      currentPiece = {
          shape: shape,
          color: colors[randomColor],
          location: location,
          // indexes: getBlockNumbers(shape, location)
      };
  }


  function start() {
      createBoard()
      createTetrominos()
      createTetromino()
      renderTetromino()
      document.addEventListener('keydown', e => {
        if ((e.keyCode == '40') || (e.keyCode == '37') || (e.keyCode == '39')) {
          checkKey(e)
        }
      })
  }

  start()
})
