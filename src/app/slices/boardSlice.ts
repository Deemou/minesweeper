import isSamePosition from '@/utils/isSamePosition';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITile, ICoord } from 'types/boardTypes';

interface IboardSlice {
  board: ITile[][];
  boardRows: number;
  boardCols: number;
  totalBombsCount: number;
  bombsLeftCount: number;
  bombsPosition: ICoord[];
  tileClickCount: number;
  isGameStart: boolean;
  isGameOver: boolean;
  isGameWon: boolean;
}

const initialState: IboardSlice = {
  board: [],
  boardRows: 8,
  boardCols: 8,
  totalBombsCount: 10,
  bombsLeftCount: 10,
  bombsPosition: [],
  tileClickCount: 0,
  isGameStart: false,
  isGameOver: false,
  isGameWon: false
};

const boardSlice = createSlice({
  name: 'boardSlice',
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<ITile[][]>) {
      state.board = action.payload;
    },
    setBombsPosition(state, action: PayloadAction<ICoord[]>) {
      state.bombsPosition = action.payload;
    },
    repositionBomb(state, action: PayloadAction<{ x: number; y: number }>) {
      const { x, y } = action.payload;
      const bombTile = state.board[x][y];

      for (let row = 0; row < state.boardRows; row++) {
        const nonBombTile = state.board[row].find((tile) => !tile.isBomb);
        if (nonBombTile) {
          bombTile.isBomb = false;
          nonBombTile.isBomb = true;
          const idx = state.bombsPosition.findIndex((pos) =>
            isSamePosition(pos, bombTile)
          );
          state.bombsPosition[idx] = nonBombTile;
          break;
        }
      }
    },
    openTile(state, action: PayloadAction<{ x: number; y: number }>) {
      const { x, y } = action.payload;
      state.board[x][y].isOpen = true;
    },
    setFlaggedStatus(
      state,
      action: PayloadAction<{ x: number; y: number; status: boolean }>
    ) {
      const { x, y, status } = action.payload;
      state.board[x][y].isFlagged = status;
    },
    setQuestionMarkStatus(
      state,
      action: PayloadAction<{ x: number; y: number; status: boolean }>
    ) {
      const { x, y, status } = action.payload;
      state.board[x][y].isQuestionMark = status;
    },
    setValue(
      state,
      action: PayloadAction<{ x: number; y: number; value: number | null }>
    ) {
      const { x, y, value } = action.payload;
      state.board[x][y].value = value;
    },
    setGameStartStatus(state, action: PayloadAction<{ status: boolean }>) {
      const { status } = action.payload;
      state.isGameStart = status;
    },
    setGameWonStatus(state, action: PayloadAction<{ status: boolean }>) {
      const { status } = action.payload;
      state.isGameWon = status;
    },
    setGameOverStatus(state, action: PayloadAction<{ status: boolean }>) {
      const { status } = action.payload;
      state.isGameOver = status;
    },
    openAllBombs(state, action: PayloadAction<{ x: number; y: number }>) {
      const { x, y } = action.payload;
      state.board[x][y].isExploded = true;
      state.bombsPosition.forEach((pos) => {
        state.board[pos.x][pos.y].isOpen = true;
      });
    },
    initTileClickCount(state) {
      state.tileClickCount = 0;
    },
    increaseTileClickCount(state) {
      state.tileClickCount += 1;
    },
    increaseBombsLeftCount(state) {
      state.bombsLeftCount += 1;
    },
    decreaseBombsLeftCount(state) {
      state.bombsLeftCount -= 1;
    },
    initBombsLeftCount(state) {
      state.bombsLeftCount = state.totalBombsCount;
    }
  }
});

export const {
  setBoard,
  setBombsPosition,
  repositionBomb,
  openTile,
  setFlaggedStatus,
  setQuestionMarkStatus,
  setValue,
  setGameStartStatus,
  setGameWonStatus,
  setGameOverStatus,
  openAllBombs,
  initTileClickCount,
  increaseTileClickCount,
  increaseBombsLeftCount,
  decreaseBombsLeftCount,
  initBombsLeftCount
} = boardSlice.actions;

export default boardSlice.reducer;
