import { ICoord } from 'types/boardTypes';
import getRandomNum from './getRandomNum';

export function generateBombs(
  boardRows: number,
  boardCols: number,
  totalBombsCount: number
): ICoord[] {
  const positions = new Set<ICoord>();

  while (positions.size < totalBombsCount) {
    const bombPosition: ICoord = {
      x: getRandomNum(boardRows),
      y: getRandomNum(boardCols)
    };

    positions.add(bombPosition);
  }

  return [...positions];
}
