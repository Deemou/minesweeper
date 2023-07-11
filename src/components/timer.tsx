import { useState, useEffect } from 'react';
import { useAppSelector } from '@app/hooks';
import { padStartZero } from '@utils/padStartZero';

const Timer = () => {
  const { isGameStart, isGameOver, isGameWon, tileClickCount } = useAppSelector(
    (state) => state.boardSlice
  );

  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (tileClickCount === 0) setTime(0);
    if (isGameStart === false) return;
    if (isGameOver || isGameWon) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prev: number) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameStart, isGameOver, isGameWon]);

  return <span>{padStartZero(time, 3)}</span>;
};

export default Timer;
