import React from 'react';
import {View, Text} from 'react-native';

import {t} from '@i18n/index';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

function createCell(row: any, col: any) {
  return {
    row,
    col,
    isBomb: false,
    isFlipped: false,
    value: 0,
  };
}

function createBoard(width: number, height: number, bombs: any) {
  const matrix = [];
  for (let row = 0; row < height; row++) {
    const newRow = [];
    for (let col = 0; col < width; col++) {
      newRow.push(createCell(row, col));
    }
    matrix.push(newRow);
  }
  // insert bombs
  insertBombs(matrix, bombs);
  // increase nums
  increaseNums(matrix);
  return matrix;
}

function increaseNums(matrix: string | any[]) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].isBomb) {
        const neighbors = getNeighbors(row, col, matrix);

        for (const neighbor of neighbors) {
          const [row, col] = neighbor;
          matrix[row][col].value += 1;
        }
      }
    }
  }
}

function getNeighbors(row: number, col: number, matrix: string | any[]) {
  const height = matrix.length;
  const width = matrix[row].length;
  const neighbors = [];
  if (row - 1 >= 0) neighbors.push([row - 1, col]); // UP
  if (row + 1 < height) neighbors.push([row + 1, col]); // DOWN
  if (col + 1 < width) neighbors.push([row, col + 1]); // RIGHT
  if (col - 1 >= 0) neighbors.push([row, col - 1]); // LEFT
  if (row - 1 >= 0 && col - 1 >= 0) neighbors.push([row - 1, col - 1]); // UP-LEFT
  if (row - 1 >= 0 && col + 1 < width) neighbors.push([row - 1, col + 1]); // UP-RIGHT
  if (row + 1 < height && col + 1 < width) neighbors.push([row + 1, col + 1]); // DOWN-RIGHT
  if (row + 1 < height && col - 1 >= 0) neighbors.push([row + 1, col - 1]); // DOWN-LEFT
  return neighbors;
}

function insertBombs(matrix: string | any[], bombs: any) {
  let bombsToInsert = bombs;
  while (bombsToInsert > 0) {
    let row = Math.floor(Math.random() * matrix.length);
    let col = Math.floor(Math.random() * matrix[0].length);
    if (!matrix[row][col].isBomb) {
      matrix[row][col].isBomb = true;
    }
    bombsToInsert--;
  }
}

function gameReducer(state: any, action: any) {
  const {type, row, col} = action;

  switch (type) {
    case 'HANDLE_CELL': {
      if (state.board[row][col].isBomb) {
        return {
          ...state,
          board: flipAll(state.board),
          isGameOver: true,
        };
      } else if (state.board[row][col].value === 0) {
        // expand
        return {
          ...state,
          board: expand(row, col, state.board),
        };
      } else {
        return {
          ...state,
          board: flipCell(row, col, state.board),
        };
      }
    }
    default: {
      console.log('error, action unknown');
    }
  }
}

function flipCell(row: any, col: any, board: any) {
  const newBoard = board.slice();
  const cell = newBoard[row][col];
  const newCell = {
    ...cell,
    isFlipped: true,
  };
  newBoard[row][col] = newCell;
  return newBoard;
}

function expand(row: any, col: any, board: string | any[]) {
  const newBoard = board.slice();
  const stack = [[row, col]];
  while (stack.length > 0) {
    const [row, col] = stack.pop();
    const neighbors = getNeighbors(row, col, newBoard);

    for (const neighbor of neighbors) {
      const [row, col] = neighbor;
      if (newBoard[row][col].isFlipped) continue;
      if (!newBoard[row][col].isBomb) {
        newBoard[row][col].isFlipped = true;
        if (newBoard[row][col].value > 0) {
          continue;
        }
        stack.push(neighbor);
      }
    }
  }
  return newBoard;
}

function flipAll(board: string | any[]) {
  const newBoard = board.slice();
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      const cell = newBoard[row][col];
      const newCell = {
        ...cell,
        isFlipped: true,
      };
      newBoard[row][col] = newCell;
    }
  }
  return newBoard;
}

function numOfOpenCells(board: string | any[]) {
  let total = 0;
  const newBoard = board.slice();
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      if (board[row][col].isFlipped) {
        total++;
      }
    }
  }
  return total;
}

export default function MinesweeperScreen() {
  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('minesweeper')} />
    </View>
  );
}
