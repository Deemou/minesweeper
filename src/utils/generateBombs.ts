import { ICoord } from 'types/boardTypes';
import getRandomNum from './getRandomNum';
import isSamePosition from './isSamePosition';

export function generateBombs(
  boardRows: number,
  boardCols: number,
  totalBombsCount: number
): ICoord[] {
  const positions: ICoord[] = [];

  while (positions.length < totalBombsCount) {
    const bombPosition: ICoord = {
      x: getRandomNum(boardRows),
      y: getRandomNum(boardCols)
    };

    if (!positions.some((pos) => isSamePosition(pos, bombPosition)))
      positions.push(bombPosition);
  }

  return positions;
}
