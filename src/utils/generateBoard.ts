import { ITile, ICoord } from 'types/boardTypes';
import { generateBombs } from './generateBombs';
import isSamePosition from './isSamePosition';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setBombsPosition } from 'app/slices/boardSlice';

export default function generateBoard(): ITile[][] {
  const dispatch = useAppDispatch();
  const { boardWidth, boardHeight } = useAppSelector(
    (state) => state.boardSlice
  );
  const board: ITile[][] = [];
  const bombsPosition: ICoord[] = generateBombs();
  dispatch(setBombsPosition(bombsPosition));

  for (let x = 0; x < boardWidth; x++) {
    const rowArr: ITile[] = [];
    for (let y = 0; y < boardHeight; y++) {
      rowArr.push({
        x,
        y,
        value: null,
        isBomb: bombsPosition.some((pos) => isSamePosition(pos, { x, y })),
        isOpen: false,
        isFlagged: false,
        isQuestionMark: false,
        isExploded: false
      });
    }
    board.push(rowArr);
  }

  return board;
}
