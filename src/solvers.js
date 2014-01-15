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

  var removePossibilities = function(board, row, column){
    for(var i = 0; i < n; i++){
      board[row][i] = 'x';
      board[i][column] = 'x';
    }
    board[row][column] = 1;
    return board;
  };

  var addNextRook = function(board, row){
    if(row === n){
      return board;
    }
    for(var i = 0; i < n; i++){
      if(board[row][i] === 0){
        board = removePossibilities(board, row, i);
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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
