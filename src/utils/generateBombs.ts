import { ICoord } from 'types/boardTypes';
import getRandomNum from './getRandomNum';

export function generateBombs(
  boardWidth: number,
  boardHeight: number,
  bombsCount: number
): ICoord[] {
  const positions = new Set<ICoord>();

  while (positions.size < bombsCount) {
    const bombPosition: ICoord = {
      x: getRandomNum(boardWidth),
      y: getRandomNum(boardHeight)
    };

    positions.add(bombPosition);
  }

  return [...positions];
}
