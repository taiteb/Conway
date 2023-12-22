let grid = [];
let nextGrid = [];
let cols = 100;
let rows = 100;
let cellWidth
let cellHeight

// one sixth of all available spots will randomly be set as live
let seed = (cols * rows) / 6

function setup() {
  createCanvas(400, 400);
  background(125)
  cellWidth = width / cols
  cellHeight = height / rows
  for (x = 0; x < rows; x++) {
    let row = [];
    let nextRow = [];
    for (y = 0; y < cols; y++) {
      row.push(new Cell(y, x))
      nextRow.push(false)
    }
    grid.push(row)
    nextGrid.push(nextRow)
  }

  // TEST BED: 3x3 grid to draw stable shapes to test expected behavior

  // center
  let testCell1 = grid[10][10]
  // testCell1.alive = true

  // topleft
  let testCell2 = grid[9][9]
  // testCell2.alive = true

  // top
  let testCell3 = grid[9][10]
  // testCell3.alive = true

  // topright
  let testCell4 = grid[9][11]
  // testCell4.alive = true

  // right
  let testCell5 = grid[10][11]
  // testCell5.alive = true

  // bottomright
  let testCell6 = grid[11][11]
  // testCell6.alive = true

  // bottom
  let testCell7 = grid[11][10]
  // testCell7.alive = true

  // bottomleft
  let testCell8 = grid[11][9]
  // testCell8.alive = true

  // left
  let testCell9 = grid[10][9]
  // testCell9.alive = true

  // randomly seed live cells
  for (let i = 0; i < seed; i++) {
    let x = floor(random(0, rows-1))
    let y = floor(random(1, cols-1))
    grid[x][y].alive = true
  }

  for (let x = 0; x < rows; x++) {
    let row = grid[x]
    for (let y = 0; y < cols; y++) {
      let cell = row[y]
      let nextCycle = cell.checkAdjacentCells()
      nextGrid[x][y] = nextCycle
      cell.show()
    }
  }
}

function draw() {
  background(255)
  frameRate(20)
  for (let x = 0; x < grid.length; x++) {
    let row = grid[x]
    for (let y = 0; y < row.length; y++) {
      let cell = row[y]
      cell.alive = nextGrid[x][y]
      if (cell.alive) {
        cell.show()
      }
    }
  }
  for (let x = 0; x < grid.length; x++) {
    let row = grid[x]
    for (let y = 0; y < row.length; y++) {
      let cell = row[y]
      cell.alive = nextGrid[x][y]
      let nextCycle = cell.checkAdjacentCells()
      nextGrid[x][y] = nextCycle
    }
  }
}

const Cell = class {
  constructor(y, x) {
    this.alive = false
    this.x = x
    this.y = y
    this.xpos = y * cellHeight
    this.ypos = x * cellWidth
    // This is just for testing to make sure 2d index values are working as expected
    this.neighbor = false
  }

  show = () => {
    strokeWeight(1)
    fill(0)
    rect(this.xpos, this.ypos, cellWidth, cellHeight)
  }

  cellMatrix = () => {
    let liveCells = 0
    // topleft, top, topright, right, bottomright, bottom, bottomleft, left
    if (this.x >= 1 && this.y >= 1) {
      let topLeft = grid[this.x - 1][this.y - 1]
      // topLeft.neighbor = true
      if (topLeft.alive) {
        liveCells++
      }
    }
    if (this.x >= 1) {
      let top = grid[this.x - 1][this.y]
      // top.neighbor = true
      if (top.alive) {
        liveCells++
      }
    }
    if (this.x >= 1 && this.y < cols - 1) {
      let topright = grid[this.x - 1][this.y + 1]
      // topright.neighbor = true
      if (topright.alive) {
        liveCells++
      }
    }
    if (this.y < cols - 1) {
      let right = grid[this.x][this.y + 1]
      // right.neighbor = true
      if (right.alive) {
        liveCells++
      }
    }
    if (this.x < rows - 1 && this.y < cols - 1) {
      let bottomright = grid[this.x + 1][this.y + 1]
      // bottomright.neighbor = true
      if (bottomright.alive) {
        liveCells++
      }
    }
    if (this.x < rows - 1) {
      let bottom = grid[this.x + 1][this.y]
      // bottom.neighbor = true
      if (bottom.alive) {
        liveCells++
      }
    }
    if (this.x < rows - 1 && this.y >= 1) {
      let bottomleft = grid[this.x + 1][this.y - 1]
      // bottomleft.neighbor = true
      if (bottomleft.alive) {
        liveCells++
      }
    }
    if (this.y >= 1) {
      let bottom = grid[this.x][this.y - 1]
      // bottom.neighbor = true
      if (bottom.alive) {
        liveCells++
      }
    }
    return liveCells
  }

  checkAdjacentCells = () => {
    let liveCells = this.cellMatrix()
    if ((this.alive && liveCells < 2) || (this.alive && liveCells > 3)) {
      return false
    } else if (this.alive == true && (liveCells >= 2 && liveCells <= 3)) {
      return true
    } else if (!this.alive && liveCells != 3) {
      return false
    } else if (this.alive == false && liveCells == 3) {
      return true
    } 
  }

}
