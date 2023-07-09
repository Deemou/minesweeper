import { ICoord } from 'types/boardTypes';

export default function isSamePosition(pos1: ICoord, pos2: ICoord): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}
