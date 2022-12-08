function labelSquares() {
  const squares = document.querySelectorAll(".square");
  let i = 0;
  for (let y = 7; y >= 0; y--) {
    for (let x = 0; x <= 7; x++) {
      squares[i].textContent = `${x},${y}`;
      i++;
    }
  }
  return squares;
}
let squares = labelSquares();
function colorSquares(squares, position, depth) {
  squares.forEach((square) => {
    if (position.toString() == square.textContent) {
      if (depth == 0) square.style.backgroundColor = "black";
      if (depth == 1) square.style.backgroundColor = "blue";
      if (depth == 2) square.style.backgroundColor = "green";
      if (depth == 3) square.style.backgroundColor = "red";
      if (depth == 4) square.style.backgroundColor = "purple";
      if (depth == 5) square.style.backgroundColor = "gray";
      if (depth == 6) square.style.backgroundColor = "brown";
      if (depth == 7) square.style.backgroundColor = "yellow";
    }
  });
}
function checkPos(posSquares) {
  let nextSquares = [];
  posSquares.forEach(([x, y]) => {
    if (x <= 7 && x >= 0 && y <= 7 && y >= 0) {
      nextSquares.push([x, y]);
    }
  });
  return nextSquares;
}

let board = [];
for (let i = 0; i < 8; i++) {
  board[i] = [];
  for (let j = 0; j < 8; j++) {
    board[i][j] = [i, j];
  }
}

class Node {
  constructor(position, depth = 0) {
    this.position = position;
    this.depth = depth;
    this.path1 = null;
    this.path2 = null;
    this.path3 = null;
    this.path4 = null;
    this.path5 = null;
    this.path6 = null;
    this.path7 = null;
    this.path8 = null;
    colorSquares(squares, position, depth);
  }
}

class Tree {
  constructor([x, y], depth = 0) {
    this.node = new Node([x, y], depth);
    this.depth = depth;
  }
  buildTree([x, y]) {
    if (board[x][y] === "X") return null;
    board[x][y] = "X";

    if (this.depth + 1 > 2) {
      return;
    }
    let possibleSquares = [
      [x + 1, y + 2],
      [x + 2, y + 1],
      [x - 1, y + 2],
      [x - 2, y + 1],
      [x + 1, y - 2],
      [x + 2, y - 1],
      [x - 1, y - 2],
      [x - 2, y - 1],
    ];
    let nextSquares = checkPos(possibleSquares);

    let depth = this.depth + 1;
    console.log(depth);

    let counter = 1;
    nextSquares.forEach(([x, y]) => {
      if (counter == 1) {
        this.node.path1 = new Tree([x, y], depth);
        this.node.path1.depth = depth;
        this.node.path1.buildTree([x, y]);
      } else if (counter == 2) {
        this.node.path2 = new Tree([x, y], depth);
        this.node.path1.depth = depth;
        this.node.path2.buildTree([x, y]);
      } else if (counter == 3) {
        this.node.path3 = new Tree([x, y], depth);
        this.node.path1.depth = depth;
        this.node.path3.buildTree([x, y]);
      } else if (counter == 4) {
        this.node.path4 = new Tree([x, y], depth);
        this.node.path1.depth = depth;
        this.node.path4.buildTree([x, y]);
      } else if (counter == 5) {
        this.node.path5 = new Tree([x, y], depth);
        this.node.path1.depth = depth;
        this.node.path5.buildTree([x, y]);
      } else if (counter == 6) {
        this.node.path6 = new Tree([x, y], depth);
        this.node.path1.depth = depth;
        this.node.path6.buildTree([x, y]);
      } else if (counter == 7) {
        this.node.path7 = new Tree([x, y], depth);
        this.node.path1.depth = depth;
        this.node.path7.buildTree([x, y]);
      } else if (counter == 8) {
        this.node.path8 = new Tree([x, y], depth);
        this.node.path1.depth = depth;
        this.node.path8.buildTree([x, y]);
      }
      counter++;
    });
  }
}

let pos = [1, 3];
let tree = new Tree(pos);
tree.buildTree(pos);
console.log(tree);
