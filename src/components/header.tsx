import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  setBoard,
  setBombsPosition,
  setGameOverStatus,
  setGameWonStatus
} from '@app/slices/boardSlice';
import generateBoard from '@utils/generateBoard';

export default function Header() {
  const { boardWidth, boardHeight, totalBombsCount, bombsLeftCount } =
    useAppSelector((state) => state.boardSlice);

  const dispatch = useAppDispatch();

  const onRestartClick = (): void => {
    dispatch(setGameOverStatus({ status: false }));
    dispatch(setGameWonStatus({ status: false }));

    const { board: newBoard, bombsPosition } = generateBoard(
      boardWidth,
      boardHeight,
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
      <div>
        <span>
          <div>999</div>
        </span>
      </div>
    </div>
  );
}
