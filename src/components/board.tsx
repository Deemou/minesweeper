import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  setBoard,
  setBombsPosition,
  setGameWonStatus
} from '@app/slices/boardSlice';
import generateBoard from '@utils/generateBoard';
import { ITile } from 'types/boardTypes';
import Tile from '@components/tile';
import '@styles/board.scss';

export default function Board() {
  const { boardRows, boardCols, totalBombsCount, board } = useAppSelector(
    (state) => state.boardSlice
  );
  const dispatch = useAppDispatch();
  const boardRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    boardRef.current.style.setProperty('--rows', String(boardRows));
    boardRef.current.style.setProperty('--cols', String(boardCols));
  }, [boardRows, boardCols]);

  useEffect(() => {
    const { board: newBoard, bombsPosition } = generateBoard(
      boardRows,
      boardCols,
      totalBombsCount
    );
    dispatch(setBoard(newBoard));
    dispatch(setBombsPosition(bombsPosition));
  }, [boardRows, boardCols, totalBombsCount]);

  useEffect(() => {
    if (!board.length) return;
    const isAllSafeTilesOpen = board
      .flat()
      .every((tile) => tile.isBomb || tile.isOpen);

    if (isAllSafeTilesOpen) {
      dispatch(setGameWonStatus({ status: true }));
    }
  }, [board]);

  return (
    <div className="board" ref={boardRef}>
      {board.map((row) => {
        return row.map((tile: ITile) => {
          return <Tile key={`${tile.x}.${tile.y}`} {...tile} />;
        });
      })}
    </div>
  );
}
