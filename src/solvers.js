/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = (new Board({n: n})).rows();

  var replaceXs = function(board){
    for(var i = 0; i < n; i++){
      for(var j = 0; j < n; j++)
        if( board[i][j] === 'x'){
          board[i][j] = 0;
        }
    }
    return board;
  };

  var addNextRook = function(board, row){
    if(row === n){
      return board;
    }
    for(var i = 0; i < n; i++){
      if(board[row][i] === 0){
        board = removePossibilities(board, row, i, n);
        break;
      }
    }
    return addNextRook(board, row + 1);
  };

  solution = replaceXs(addNextRook(solution, 0));

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount = 0;
  var board = (new Board({n: n})).rows();
  var clearBoard = (new Board({n: n})).rows();
  var rounds = 0;


  var addNextRook = function(board, row, position, availablePlaces, isFirst){
    // if(isFirst) {
    //   console.log("This is the original board:");
    //   console.table(board);
    // }
    // console.log("called with: ", "row ", row, "position ", position, "Available Places ", availablePlaces);
    if(position === 1) {
   //   debugger;
    }
    var oldBoard = _.map(board, function(arr){
      return _.map(arr, function(a){
        return a;
      });
    });
    var count = 0;
    var nextRowAP = 0;
    if(row === n){
      solutionCount++;
      return;
    }
    // console.table(board);
    //iterate through row
    for(var i = 0; i < n; i++){
      if(board[row][i] === 0){
        if(count === position) {
          board = removePossibilities(board, row, i, n);
          availablePlaces -= 1;
          break;
        }
        count += 1;
      }
    }
    //if not on the last row
    if( row !== (n - 1)){
      for(i = 0; i < n; i++){
        if(board[row+1][i] === 0){
          nextRowAP += 1;
        }
      }
    }
    addNextRook(board, row + 1, 0, nextRowAP);
    // if(position < availablePlaces){
    if(availablePlaces > 0 && position < n-1){
      position += 1;
      // debugger;
      // if(isFirst) {
      //   console.log("this is the oldBoard:");
      //   console.table(oldBoard);
      // }
      // console.table(oldBoards[oldBoards.length-1]);
      addNextRook(oldBoard, row, position, availablePlaces);
    }
    return;
  };

  addNextRook(board, 0, 0, n, true);
  // console.table(oldBoards);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solutionCount = 0;
  var board = (new Board({n: n})).rows();
  var rounds = 0;
  var solution = (new Board({n: n})).rows();


  var addNextQueen = function(board, row, position, availablePlaces, isFirst){
    if(solution){
      return;
    }
    var oldBoard = _.map(board, function(arr){
      return _.map(arr, function(a){
        return a;
      });
    });
    var count = 0;
    var nextRowAP = 0;
    if(row === n){
      if(_.filter(_.flatten(board), function(value){if(value===1)return true; return false;}).length === n){
        solutionCount++;
        debugger;
        solution = board;
      }
      return;
    }
    // console.table(board);
    //iterate through row
    for(var i = 0; i < n; i++){
      if(board[row][i] === 0){
        if(count === position) {
          board = addXsQueens(board, row, i, n);
          availablePlaces -= 1;
          break;
        }
        count += 1;
      }
    }
    //if not on the last row
    if( row !== (n - 1)){
      for(i = 0; i < n; i++){
        if(board[row+1][i] === 0){
          nextRowAP += 1;
        }
      }
    }
    addNextQueen(board, row + 1, 0, nextRowAP);
    // if(position < availablePlaces){
    if(availablePlaces > 0 && position < n-1){
      position += 1;
      // debugger;
      // if(isFirst) {
      //   console.log("this is the oldBoard:");
      //   console.table(oldBoard);
      // }
      // console.table(oldBoards[oldBoards.length-1]);
      addNextQueen(oldBoard, row, position, availablePlaces);
    }
    return;
  };

  addNextQueen(board, 0, 0, n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = 0;
  var board = (new Board({n: n})).rows();
  var clearBoard = (new Board({n: n})).rows();
  var rounds = 0;


  var addNextQueen = function(board, row, position, availablePlaces, isFirst){
    var oldBoard = _.map(board, function(arr){
      return _.map(arr, function(a){
        return a;
      });
    });
    var count = 0;
    var nextRowAP = 0;
    if(row === n){
      if(_.filter(_.flatten(board), function(value){if(value===1)return true; return false;}).length === n){
        solutionCount++;
      }
      return;
    }
    // console.table(board);
    //iterate through row
    for(var i = 0; i < n; i++){
      if(board[row][i] === 0){
        if(count === position) {
          board = addXsQueens(board, row, i, n);
          availablePlaces -= 1;
          break;
        }
        count += 1;
      }
    }
    //if not on the last row
    if( row !== (n - 1)){
      for(i = 0; i < n; i++){
        if(board[row+1][i] === 0){
          nextRowAP += 1;
        }
      }
    }
    addNextQueen(board, row + 1, 0, nextRowAP);
    // if(position < availablePlaces){
    if(availablePlaces > 0 && position < n-1){
      position += 1;
      // debugger;
      // if(isFirst) {
      //   console.log("this is the oldBoard:");
      //   console.table(oldBoard);
      // }
      // console.table(oldBoards[oldBoards.length-1]);
      addNextQueen(oldBoard, row, position, availablePlaces);
    }
    return;
  };

  addNextQueen(board, 0, 0, n, true);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.removePossibilities = function(board, row, column, n){
  for(var i = 0; i < n; i++){
    board[row][i] = 'x';
    board[i][column] = 'x';
  }
  board[row][column] = 1;
  return board;
};

window.addXsQueens = function(board, row, column, n){
  var majorStart = column - row;
  var minorStart = column + row;
  for(var i = 0; i < n; i++){
    board[row][i] = 'x';
    board[i][column] = 'x';
    if(this.isInBounds(i, majorStart + i, n)){
      board[i][majorStart + i] = 'x';
    }
  }

  for(var i = minorStart; i >= 0; i--) {
    if(this.isInBounds(minorStart - i, i, n)) {
      board[minorStart - i][i] = 'x';
    }
  }


  board[row][column] = 1;
  return board;
};


window.isInBounds = function(rowIndex, colIndex, n){
  return (
    0 <= rowIndex && rowIndex < n &&
    0 <= colIndex && colIndex < n
  );
};