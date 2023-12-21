let grid = [];
let cols = 10;
let rows = 10;
let cellWidth
let cellHeight

function setup() {
  createCanvas(400, 400);
  background(125)
  cellWidth = width / cols
  cellHeight = height / rows
  for (x = 0; x < rows; x++) {
    let row = [];
    for (y = 0; y < cols; y++) {
      row.push(new Cell(y, x))
    }
    grid.push(row)
  }


  // let testCell = grid[10][10]
  // testCell.alive = true

  let testCellTwo = grid[1][1]
  testCellTwo.alive = true
  testCellTwo.checkAdjacentCells()

  for (let x = 0; x < grid.length; x++) {
    let row = grid[x]
    for (let y = 0; y < row.length; y++) {
      let cell = row[y]
      cell.show()
      // cell.checkAdjacentCells()
    }
  }

  console.log(grid)
}

function draw() {
  grid
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
    strokeWeight(5)
    if (this.alive) {
      fill(0, 0, 255)
    } else if (this.neighbor) {
      fill(255, 0, 0)
    } else {
      noFill()
    }
    rect(this.xpos, this.ypos, cellWidth, cellHeight)
  }

  checkAdjacentCells = () => {
    let liveCells = 0
    console.log(this.x, this.y)
    // topleft, top, topright, right, bottomright, bottom, bottomleft, left
    if (this.x >= 1 && this.y >= 1) {
      let topLeft = grid[this.x - 1][this.y - 1]
      topLeft.neighbor = true
      if (topLeft.alive) {
        liveCells++ 
      }
    } 
    if (this.x >= 1){
      let top = grid[this.x - 1][this.y]
      top.neighbor = true
    }

    if (this.x >= 1 && this.y <= cols) {
      let topright = grid[this.x - 1][this.y + 1]
      topright.neighbor = true
      if (topright.alive) {
        liveCells++
      }
    }
  }
}

function checkAdjacentCells(cell) {

}