import Square from './square';

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

// loop to dynamically create DOM board
for (let x = 0; x < 8; x += 1) {
  // rows indicated by 'x', columns by 'y'
  const row = createAndPrepend('div', 'row', boardCont);
  for (let y = 0; y < 8; y += 1) {
    const square = createAndAppend('button', 'square', null, row);
    square.textContent = `[${x}, ${y}]`;
    if (x % 2 === 0 && y % 2 === 0) {
      square.style.backgroundColor = 'gray';
    } else if (x % 2 !== 0 && y % 2 !== 0) {
      square.style.backgroundColor = 'gray';
    }
  }
}

// **** need to create board class
// create board data structure with 2D coordinates

boardCont.addEventListener('click', (e) => {
  if (e.target.classList.contains('square')) {
    console.log(e.target.textContent);
  }
});

class Board {
  constructor(value) {
    this.currentSquare = value;
  }

  knightMoves(end, start = [0, 0], queue = [], previous = end) {
    const x = end[0];
    const y = end[1];
    const startX = start[0];
    const startY = start[1];

    // start with end position and work way to start position

    // once start position is reached, note completion
    if (x === startX && y === startY) {
      console.log('You made it!');
      console.log('Here are your moves: ');
      console.log(start);
      //   return true;
      return start;
    }

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

    while (queue.length) {
      const currentQueue = queue[0];

      queue.shift();

      // set parent for the next 8 possible moves
      if (currentQueue.parent) {
        previous = currentQueue.parent;
        continue;
      }

      let nextOutcome = this.knightMoves(currentQueue, start, queue, previous);

      if (nextOutcome === null) {
        continue;
      } else if (
        nextOutcome[0] === currentQueue[0] &&
        nextOutcome[1] === currentQueue[1]
      ) {
        // queue.length = 0;

        console.log(previous);
        return previous;
      }
      return nextOutcome;
    }
    // return false;
    // **** HOW TO ONLY RETURN THE CASES THAT WORK AND NOT ALL CASES??
  }
}

let testBoard = new Board(null);

let moves = testBoard.knightMoves([6, 7]);
// console.log(moves);
