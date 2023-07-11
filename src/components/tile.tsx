import { ITile } from 'types/boardTypes';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  repositionBomb,
  openTile,
  setFlaggedStatus,
  setQuestionMarkStatus,
  setValue,
  setGameStartStatus,
  setGameOverStatus,
  openAllBombs,
  increaseTileClickCount,
  increaseBombsLeftCount,
  decreaseBombsLeftCount
} from '@app/slices/boardSlice';
import { determineNumberColor } from '@utils/determineNumberColor';
import getAdjacentTiles from '@utils/getAdjacentTiles';
import { useState, useEffect } from 'react';
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
  const { board, isGameOver, isGameWon, tileClickCount } = useAppSelector(
    (state) => state.boardSlice
  );
  const dispatch = useAppDispatch();
  const [numberColor, setNumberColor] = useState('#878787');

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

  useEffect(() => {
    if (!isNumberMarked) return;
    setNumberColor(determineNumberColor(value));
  }, [isNumberMarked]);

  const onTileLeftClick = () => {
    if (isFlagged || isQuestionMark) return;

    if (tileClickCount === 0) dispatch(setGameStartStatus({ status: true }));
    if (tileClickCount === 0 && isBomb) dispatch(repositionBomb({ x, y }));
    else if (tileClickCount !== 0 && isBomb) {
      dispatch(setGameStartStatus({ status: false }));
      dispatch(setGameOverStatus({ status: true }));
      dispatch(openAllBombs({ x, y }));
    }
    dispatch(increaseTileClickCount());
    dispatch(openTile({ x, y }));
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
      style={{ color: numberColor }}
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
