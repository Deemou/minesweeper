import { useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface GameSetupFormProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardProps: (
    boardRows: number,
    boardCols: number,
    totalBombsCount: number
  ) => void;
}

interface IGameSetupForm {
  boardRows: number;
  boardCols: number;
  totalBombsCount: number;
}

export default function GameSetupForm({
  setIsModalVisible,
  setBoardProps
}: GameSetupFormProps) {
  const {
    boardRows: currentBoardRows,
    boardCols: currentBoardCols,
    totalBombsCount: currentTotalBombsCount
  } = useAppSelector((state) => state.boardSlice);
  const { register, setValue, handleSubmit } = useForm<IGameSetupForm>();

  useEffect(() => {
    setValue('boardRows', currentBoardRows);
    setValue('boardCols', currentBoardCols);
    setValue('totalBombsCount', currentTotalBombsCount);
  }, [currentBoardRows, currentBoardCols, currentTotalBombsCount]);

  const onValid = ({
    boardRows,
    boardCols,
    totalBombsCount
  }: IGameSetupForm) => {
    setBoardProps(boardRows, boardCols, totalBombsCount);
    setIsModalVisible(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="form">
        <div className="input-box">
          <label htmlFor="boardRows">Board Rows</label>
          <input
            id="boardRows"
            type="number"
            required
            min={8}
            max={50}
            {...register('boardRows', {
              required: true
            })}
          />
        </div>
        <div className="input-box">
          <label htmlFor="boardCols">Board Columns</label>
          <input
            id="boardCols"
            type="number"
            required
            min={8}
            max={50}
            {...register('boardCols', {
              required: true
            })}
          />
        </div>
        <div className="input-box">
          <label htmlFor="totalBombsCount">Number of Bombs</label>
          <input
            id="totalBombsCount"
            type="number"
            required
            min={10}
            max={100}
            {...register('totalBombsCount', {
              required: true
            })}
          />
        </div>

        <button type="submit">
          <span>Apply</span>
        </button>
      </form>
    </>
  );
}
