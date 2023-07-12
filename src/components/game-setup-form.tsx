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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<IGameSetupForm>();

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
        <div>
          <label htmlFor="boardRows">Board Rows:</label>
          <input
            id="boardRows"
            type="number"
            required
            {...register('boardRows', {
              required: true,
              min: {
                value: 8,
                message: 'The minimum value of rows is 8'
              },
              max: {
                value: 50,
                message: 'The maximun value of rows is 50'
              }
            })}
          />
          {errors.boardRows && (
            <span className="error-message">{errors.boardRows.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="boardCols">Board Columns:</label>
          <input
            id="boardCols"
            type="number"
            required
            {...register('boardCols', {
              required: true,
              min: {
                value: 8,
                message: 'The minimum value of columns is 8'
              },
              max: {
                value: 50,
                message: 'The maximun value of columns is 50'
              }
            })}
          />
          {errors.boardCols && (
            <span className="error-message">{errors.boardCols.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="totalBombsCount">Number of Bombs:</label>
          <input
            id="totalBombsCount"
            type="number"
            required
            {...register('totalBombsCount', {
              required: true,
              min: {
                value: 10,
                message: 'The minimum value of bombs is 10'
              },
              max: {
                value: 50,
                message: 'The maximun value of bombs is 50'
              }
            })}
          />
          {errors.totalBombsCount && (
            <span className="error-message">
              {errors.totalBombsCount.message}
            </span>
          )}
        </div>
        <button type="submit">
          <span>Apply</span>
        </button>
      </form>
    </>
  );
}
