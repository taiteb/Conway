let grid = [];
let cols = 20;
let rows = 20;
let cellWidth
let cellHeight
let seed = 20

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


  let testCell = grid[9][9]
  testCell.alive = true

  let testCellTwo = grid[10][10]
  testCellTwo.alive = true

  let testCellThree = grid[11][11]
  testCellThree.alive = true

  let testCellFour = grid[10][11]
  testCellFour.alive = true

  let testCellFive = grid[9][11]
  testCellFive.alive = true

  console.log(testCellThree.cellMatrix())

  // for (let i = 0; i < 450; i++) {
  //   let x = floor(random(0, 10))
  //   let y = floor(random(1, 9))
  //   grid[x][y].alive = true
  //   // console.log(x, y, grid[x][y])
  // }

  for (let x = 0; x < rows; x++) {
    let row = grid[x]
    for (let y = 0; y < cols; y++) {
      let cell = row[y]
      // cell.checkAdjacentCells()
      cell.show()
    }
  }
}

function draw() {
  // background(255)
  frameRate(.25)
  // for (let x = 0; x < grid.length; x++) {
  //   let row = grid[x]
  //   for (let y = 0; y < row.length; y++) {
  //     let cell = row[y]
  //     cell.checkAdjacentCells()
  //     // console.log(cell.cellMatrix())
  //     cell.show()
  //   }
  // }
  // noLoop()
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
    if (this.alive) {
      rect(this.xpos, this.ypos, cellWidth, cellHeight)
    }
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
    if (liveCells == 3) {
      this.alive == true
    }
    if (this.alive && liveCells < 2) {
      this.alive = false
      // console.log("should be dead")
    } else if (this.alive && liveCells > 3) {
      this.alive = false
    } else if (this.alive) {
      this.alive = true
    }
  }

}
