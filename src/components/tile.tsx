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
import FlagIcon from '@/asset/icon/flag-icon';
import QuestionMarkIcon from '@/asset/icon/question-mark-icon';
import BombIcon from '@/asset/icon/bomb-icon';
import '@styles/tile.scss';

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
  const dispatch = useAppDispatch();

  const isQuestionMarkMarked = !isOpen && isQuestionMark;
  const isBombMarked = isOpen && isBomb;
  const isNumberMarked = isOpen && value;
  const isTileDisabled = isOpen || isGameOver || isGameWon;

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
      className={`tile ${isOpen ? 'open' : ''} ${isBombMarked ? 'bomb' : ''} ${
        isExploded ? 'exploded' : ''
      }`}
    >
      {isFlagged && <FlagIcon />}
      {isQuestionMarkMarked && <QuestionMarkIcon />}
      {isBombMarked && <BombIcon />}
      {isNumberMarked ? value : ''}
    </button>
  );
}
