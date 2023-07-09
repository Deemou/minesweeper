import { ITile } from 'types/boardTypes';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  openTile,
  increaseBombsLeftCount,
  decreaseBombsLeftCount,
  setFlaggedStatus,
  setQuestionMarkStatus,
  setValue,
  setGameOverStatus,
  openAllBombs
} from '@app/slices/boardSlice';
import getAdjacentTiles from '@utils/getAdjacentTiles';
import { useEffect } from 'react';

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
  const { board, isGameOver, isGameWon } = useAppSelector(
    (state) => state.boardSlice
  );
  const isTileDisabled = isOpen || isGameOver || isGameWon;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOpen || isBomb) return;

    const adjacentTiles = getAdjacentTiles(board, x, y);
    const adjacentBombs = adjacentTiles.filter((tile) => tile.isBomb);
    dispatch(
      setValue({
        x,
        y,
        value: adjacentBombs.length
      })
    );

    if (adjacentBombs.length !== 0) return;
    openAdjacentTilesExceptFlagged(adjacentTiles);
  }, [isOpen]);

  const openAdjacentTilesExceptFlagged = (adjacentTiles: ITile[]): void => {
    adjacentTiles.forEach((tile) => {
      !tile.isFlagged && dispatch(openTile({ x: tile.x, y: tile.y }));
    });
  };

  const onTileLeftClick = (): void => {
    if (isFlagged || isQuestionMark) return;

    if (isBomb) {
      dispatch(setGameOverStatus({ status: true }));
      dispatch(openAllBombs({ x, y }));
    } else {
      dispatch(openTile({ x, y }));
    }
  };

  const onTileRightClick = (e: React.MouseEvent): void => {
    e.preventDefault();

    if (isOpen || isGameOver || isGameWon) return;

    if (!isFlagged && !isQuestionMark) {
      dispatch(setFlaggedStatus({ x, y, status: true }));
      dispatch(decreaseBombsLeftCount());
    } else if (isFlagged) {
      dispatch(setFlaggedStatus({ x, y, status: false }));
      dispatch(setQuestionMarkStatus({ x, y, status: true }));
      dispatch(increaseBombsLeftCount());
    } else {
      dispatch(setQuestionMarkStatus({ x, y, status: false }));
    }
  };

  return (
    <button
      type="button"
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
