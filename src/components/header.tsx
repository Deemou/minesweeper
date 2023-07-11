import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  setBoard,
  setBombsPosition,
  setGameStartStatus,
  setGameOverStatus,
  setGameWonStatus,
  initTileClickCount
} from '@app/slices/boardSlice';
import generateBoard from '@utils/generateBoard';
import { padStartZero } from '@/utils/padStartZero';
import Timer from '@components/timer';

export default function Header() {
  const { boardRows, boardCols, totalBombsCount, bombsLeftCount } =
    useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();

  const onRestartClick = (): void => {
    dispatch(setGameStartStatus({ status: false }));
    dispatch(setGameOverStatus({ status: false }));
    dispatch(setGameWonStatus({ status: false }));
    dispatch(initTileClickCount());

    const { board: newBoard, bombsPosition } = generateBoard(
      boardRows,
      boardCols,
      totalBombsCount
    );
    dispatch(setBoard(newBoard));
    dispatch(setBombsPosition(bombsPosition));
  };

  return (
    <div>
      <div>
        <span>{bombsLeftCount}</span>
      </div>
      <div>
        <button type="button" onClick={() => onRestartClick()}>
          Restart
        </button>
      </div>
      <div className="timer">
        <Timer />
      </div>
    </div>
  );
}
