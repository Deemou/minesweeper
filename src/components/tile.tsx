import { ITile } from 'types/boardTypes';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import {
  openTile,
  increaseBombsCount,
  decreaseBombsCount,
  setFlaggedStatus,
  setQuestionMarkStatus,
  setValue,
  setGameOverStatus,
  openAllBombs
} from 'app/slices/boardSlice';
import getAdjacentTiles from 'utils/getAdjacentTiles';

export default function Tile({
  value,
  x,
  y,
  isOpen,
  isFlagged,
  isQuestionMark,
  isBomb,
  isExploded
}: ITile) {
  const { isGameOver, isGameWon } = useAppSelector((state) => state.boardSlice);
  const isTileDisabled = isOpen || isGameOver || isGameWon;
  const dispatch = useAppDispatch();

  const onTileLeftClick = (): void => {
    if (isFlagged || isQuestionMark) return;

    if (isBomb) {
      dispatch(setGameOverStatus({ status: true }));
      dispatch(openAllBombs({ x, y }));
    } else {
      const adjacentTiles = getAdjacentTiles(x, y);
      const adjacentBombs = adjacentTiles.filter((tile) => tile.isBomb);
      dispatch(
        setValue({
          x,
          y,
          value: adjacentBombs.length
        })
      );
      dispatch(openTile({ x, y }));
    }
  };

  const onTileRightClick = (e: React.MouseEvent): void => {
    e.preventDefault();

    if (isOpen || isGameOver || isGameWon) return;

    if (!isFlagged && !isQuestionMark) {
      dispatch(setFlaggedStatus({ x, y, status: true }));
      dispatch(decreaseBombsCount());
    } else if (isFlagged) {
      dispatch(setFlaggedStatus({ x, y, status: false }));
      dispatch(setQuestionMarkStatus({ x, y, status: true }));
      dispatch(increaseBombsCount());
    } else {
      dispatch(setQuestionMarkStatus({ x, y, status: false }));
    }
  };

  return (
    <button
      disabled={isTileDisabled}
      onContextMenu={(e) => onTileRightClick(e)}
      onClick={onTileLeftClick}
    >
      {/* 타일 표시 로직
        빈칸, 숫자, Flag, ?, Bomb
      */}
    </button>
  );
}
