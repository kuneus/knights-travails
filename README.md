# Knights Travails

🔗 Live link: https://kuneus.github.io/knights-travails/

This is the Knights Travails assignment as part of The Odin Project curriculum. The goal of this project was to create a function that finds the shortest way possible for a chess knight to move from one square to another while displaying all the squares the knight passes along the way.

Creation of this function required application of a search algorithm to find the most efficient path. For this function, a breadth-first search strategy was employed.

🔗 Link to assignment: https://www.theodinproject.com/lessons/javascript-knights-travails

## How to use

![](https://github.com/kuneus/knights-travails/blob/main/src/travail.gif)

The board starts with the knight at the [0,0] coordinate, or the most bottom left square on the board.

First, click on any square, which will then execute the knightMoves function and display the path from the start position to the clicked square by highlighting the squares along the way.

Once a square is clicked, that square becomes the new starting position. Subsequent clicks will clear the previous path.

Open up the console ('cmd + Option + J' for Mac, 'Ctrl + Shift + J' for Windows) to see the function in action through console.log statements.
