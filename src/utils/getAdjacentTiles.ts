import { ITile } from 'types/boardTypes';

export default function getAdjacentTiles(
  board: ITile[][],
  x: number,
  y: number
): ITile[] {
  const tiles: ITile[] = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile: ITile = board[x + xOffset]?.[y + yOffset];

      if (tile) tiles.push(tile);
    }
  }
  return tiles;
}
