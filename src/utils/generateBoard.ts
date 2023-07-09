import { ITile, ICoord } from 'types/boardTypes';
import { generateBombs } from './generateBombs';
import isSamePosition from './isSamePosition';

export default function generateBoard(
  boardWidth: number,
  boardHeight: number,
  totalBombsCount: number
): { board: ITile[][]; bombsPosition: ICoord[] } {
  const board: ITile[][] = [];
  const bombsPosition: ICoord[] = generateBombs(
    boardWidth,
    boardHeight,
    totalBombsCount
  );

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

  return { board, bombsPosition };
}
