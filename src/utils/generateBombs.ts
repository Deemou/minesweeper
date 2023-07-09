import { ICoord } from 'types/boardTypes';
import getRandomNum from './getRandomNum';
import { useAppSelector } from '@app/hooks';

export function generateBombs(): ICoord[] {
  const { boardWidth, boardHeight, bombsCount } = useAppSelector(
    (state) => state.boardSlice
  );
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
