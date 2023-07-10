import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITile, ICoord } from 'types/boardTypes';

interface IboardSlice {
  board: ITile[][];
  boardRows: number;
  boardCols: number;
  totalBombsCount: number;
  bombsLeftCount: number;
  bombsPosition: ICoord[];
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
    increaseBombsLeftCount(state) {
      state.bombsLeftCount += 1;
    },
    decreaseBombsLeftCount(state) {
      state.bombsLeftCount -= 1;
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
    }
  }
});

export const {
  setBoard,
  setBombsPosition,
  openTile,
  setFlaggedStatus,
  increaseBombsLeftCount,
  decreaseBombsLeftCount,
  setQuestionMarkStatus,
  setValue,
  setGameWonStatus,
  setGameOverStatus,
  openAllBombs
} = boardSlice.actions;

export default boardSlice.reducer;
