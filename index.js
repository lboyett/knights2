// function labelSquares() {
//   const squares = document.querySelectorAll(".square");
//   let i = 0;
//   for (let y = 7; y >= 0; y--) {
//     for (let x = 0; x <= 7; x++) {
//       squares[i].textContent = `${x},${y}`;
//       i++;
//     }
//   }
//   return squares;
// }
// let squares = labelSquares();
// function colorSquares(squares, position, depth) {
//   squares.forEach((square) => {
//     if (position.toString() == square.textContent) {
//       if (depth == 0) square.style.backgroundColor = "black";
//       if (depth == 1) square.style.backgroundColor = "blue";
//       if (depth == 2) square.style.backgroundColor = "green";
//       if (depth == 3) square.style.backgroundColor = "red";
//       if (depth == 4) square.style.backgroundColor = "purple";
//       if (depth == 5) square.style.backgroundColor = "gray";
//       if (depth == 6) square.style.backgroundColor = "brown";
//       if (depth == 7) square.style.backgroundColor = "yellow";
//     }
//   });
// }
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

let depthArray = [];

class Node {
  constructor(position, depth = 0) {
    this.correct = false;
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
    // colorSquares(squares, position, depth);
  }
}

let correctNode;

class Tree {
  constructor([x, y], end = [0, 0], depth = 0) {
    this.node = new Node([x, y], depth);
    this.depth = depth;
    this.end = end;
    this.correct = false;
  }
  buildTree([x, y]) {
    // if (board[x][y] === "X") return null;
    // board[x][y] = "X";
    let end = this.end;

    if (this.depth != null && end[0] == x && end[1] == y) {
      depthArray.push(this.depth);
      return;
    }

    let depth = this.depth + 1;

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

    let counter = 1;
    nextSquares.forEach(([x, y]) => {
      this.node[`path${counter}`] = new Tree([x, y], end, depth);
      this.node[`path${counter}`].depth = depth;
      this.node[`path${counter}`].buildTree([x, y]);
      counter++;
    });
  }
  find([a, b], depth) {
    let children = [];
    if (this.depth > depth) return;
    for (let i = 1; i <= 8; i++) {
      if (this.node[`path${i}`]) children.push(this.node[`path${i}`]);
    }
    children.forEach((child) => {
      if (child.node.position[0] == a && child.node.position[1] == b) {
        correctNode = child.node;
        correctNode.correct = true;
        console.log(correctNode);
      } else {
        child.find([a, b], depth);
      }
    });
  }
  drawPath(depth) {
    let children = [];
    if (this.depth > depth) return;
    for (let i = 1; i <= 8; i++) {
      if (this.node[`path${i}`]) children.push(this.node[`path${i}`]);
    }
    children.forEach((child) => {
      if (true) {
        console.log(this);
      } else {
        child.find([a, b], depth);
      }
    });
  }
}

let pos = [1, 3];
let end = [1, 5];
let tree = new Tree(pos, end);
tree.buildTree(pos);
console.log(tree);
let depth = Math.min.apply(Math, depthArray);
console.log(tree.find(end, depth));
console.log(tree.drawPath(end, depth));
console.log("MIN STEPS: " + Math.min.apply(Math, depthArray));
