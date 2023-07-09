import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  setBoard,
  setBombsPosition,
  setGameWonStatus
} from '@app/slices/boardSlice';
import generateBoard from '@utils/generateBoard';
import { ITile } from 'types/boardTypes';
import Tile from '@components/tile';

export default function Board() {
  const { boardWidth, boardHeight, bombsCount, board } = useAppSelector(
    (state) => state.boardSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const { board: newBoard, bombsPosition } = generateBoard(
      boardWidth,
      boardHeight,
      bombsCount
    );
    dispatch(setBoard(newBoard));
    dispatch(setBombsPosition(bombsPosition));
  }, [boardWidth, boardHeight, bombsCount]);

  useEffect(() => {
    if (bombsCount !== 0) return;
    const isAllSafeTilesOpen = board
      .flat()
      .every((tile) => tile.isBomb || tile.isOpen);

    if (isAllSafeTilesOpen) dispatch(setGameWonStatus({ status: true }));
  }, [board, bombsCount]);

  return (
    <div>
      1
      {board.map((row) => {
        return row.map((tile: ITile) => {
          return <Tile key={`${tile.x}.${tile.y}`} {...tile} />;
        });
      })}
    </div>
  );
}
