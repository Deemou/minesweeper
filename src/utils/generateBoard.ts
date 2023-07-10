import { ITile, ICoord } from 'types/boardTypes';
import { generateBombs } from './generateBombs';
import isSamePosition from './isSamePosition';

export default function generateBoard(
  boardRows: number,
  boardCols: number,
  totalBombsCount: number
): { board: ITile[][]; bombsPosition: ICoord[] } {
  const board: ITile[][] = [];
  const bombsPosition: ICoord[] = generateBombs(
    boardRows,
    boardCols,
    totalBombsCount
  );

  for (let x = 0; x < boardRows; x++) {
    const rowArr: ITile[] = [];
    for (let y = 0; y < boardCols; y++) {
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

  return { board, bombsPosition };
}
