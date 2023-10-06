const boardCont = document.getElementById('board-cont');

const createAndAppend = (el, elClass, elId, elParent) => {
  const element = document.createElement(el);

  if (elClass) {
    element.setAttribute('class', elClass);
  }

  if (elId) element.setAttribute('id', elId);

  if (elParent) elParent.appendChild(element);
  return element;
};

const createAndPrepend = (el, elClass, elParent) => {
  const element = document.createElement(el);

  if (elClass) {
    element.setAttribute('class', elClass);
  }

  if (elParent) elParent.prepend(element);
  return element;
};

class Board {
  constructor(value) {
    this.currentSquare = value;
    this.trail.push(value);
    this.createBoard();
  }

  arrayBoard = [];

  trail = [];
  trailDOM = [];

  // reset trail array and highlighted trail
  clearTrail() {
    this.trail = [];

    for (let i = 0; i < this.trailDOM.length; i += 1) {
      if (this.trailDOM[i].classList.contains('light-square')) {
        this.trailDOM[i].style.backgroundColor = 'var(--light-square)';
      } else {
        this.trailDOM[i].style.backgroundColor = 'var(--dark-square)';
      }
    }
    this.trailDOM = [];
  }

  createBoard() {
    // loop to dynamically create DOM board
    for (let y = 0; y < 8; y += 1) {
      // rows indicated by 'x', columns by 'y'
      const row = createAndPrepend('div', 'row', boardCont);
      for (let x = 0; x < 8; x += 1) {
        const square = createAndAppend('button', `square ${x}${y}`, null, row);
        // push coordinates to array
        this.arrayBoard.push([x, y]);
        if (x === 0 && y === 0) {
          square.classList = `square ${x}${y} light-square`;
          square.style.backgroundColor = 'red';
        } else if (x % 2 === 0 && y % 2 === 0) {
          square.classList = `square ${x}${y} light-square`;
          square.style.backgroundColor = 'var(--light-square';
        } else if (x % 2 !== 0 && y % 2 !== 0) {
          square.classList = `square ${x}${y} light-square`;
          square.style.backgroundColor = 'var(--light-square';
        }
      }
    }
  }

  highlightTrail() {
    // set time out to space apart each move
    const delay = (i) => {
      setTimeout(() => {
        let stringCoordinates = this.trail[i].join('');
        let square = document.getElementsByClassName(
          `square ${stringCoordinates}`,
        );
        // keep track of highlighted squares
        this.trailDOM.push(square[0]);
        square[0].style.backgroundColor = 'red';
      }, 300 * i);
    };

    // loop through trail to change color of each square
    for (let i = 0; i < this.trail.length; i += 1) {
      delay(i);
    }
  }

  knightMoves(end, start = this.currentSquare, queue = [], previous = end) {
    const x = end[0];
    const y = end[1];
    const startX = start[0];
    const startY = start[1];

    // base case when end point has been reached
    if (x === startX && y === startY) {
      console.log('You made it!');
      console.log('Here are your moves: ');
      console.log(start);
      this.trail.push(start);
      this.highlightTrail(start);
      return start;
    }

    // if value is out of the table
    if (x < 0 || y < 0 || x > 7 || y > 7) {
      return null;
    }

    // start each level with parent object for identifying the parent node
    queue.push({ parent: end });

    // push current square's 8 possible next moves to queue
    queue.push([x + 1, y + 2]);
    queue.push([x + 2, y + 1]);
    queue.push([x + 2, y - 1]);
    queue.push([x + 1, y - 2]);
    queue.push([x - 1, y + 2]);
    queue.push([x - 2, y + 1]);
    queue.push([x - 2, y - 1]);
    queue.push([x - 1, y - 2]);

    // traverse with BFS
    while (queue.length) {
      const currentQueue = queue[0];
      queue.shift();

      // if current queue is a parent marker, change the parent
      if (currentQueue.parent) {
        previous = currentQueue.parent;
        continue;
      }

      const next = this.knightMoves(currentQueue, start, queue, previous);

      if (next === null) {
        continue;
      } else if (
        // check if 2 moves are connected to each other
        next[0] === currentQueue[0] &&
        next[1] === currentQueue[1]
      ) {
        console.log(previous);
        this.trail.push(previous);
        this.currentSquare = previous;
        return previous;
      }
      return next;
    }
  }
}

let testBoard = new Board([0, 0]);

const listeners = () => {
  boardCont.addEventListener('click', (e) => {
    // find coordinate of button clicked
    let clickedSquare;

    // first loop through array of all squares
    for (let i = 0; i < testBoard.arrayBoard.length; i += 1) {
      // get proper format of square number
      let string = testBoard.arrayBoard[i].join('');
      if (string === e.target.classList[1]) {
        clickedSquare = testBoard.arrayBoard[i];
      }
    }

    if (e.target.classList.contains('square')) {
      testBoard.clearTrail();
      testBoard.knightMoves(clickedSquare);
      testBoard.highlightTrail();
    }
  });
};

export default listeners;
