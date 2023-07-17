import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from '@/app/hooks';
import {
  setBoardRows,
  setBoardCols,
  setTotalBombsCount,
  initBombsLeftCount,
  setGameStartStatus,
  setGameOverStatus,
  setGameWonStatus,
  initTileClickCount
} from '@app/slices/boardSlice';
import CheckIcon from '@/asset/icon/check-icon';
import GameSetupModal from '@/components/game-setup-modal';
import '@styles/menu.scss';

export default function Menu() {
  const dispatch = useAppDispatch();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [level, setLevel] = useState('Beginner');
  const menuRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (level === 'Custom') return;

    switch (level) {
      case 'Beginner':
        setBoardProps(8, 8, 10);
        break;
      case 'Intermediate':
        setBoardProps(16, 16, 40);
        break;
      case 'Expert':
        setBoardProps(16, 32, 100);
        break;
    }
  }, [level]);

  const setBoardProps = useCallback(
    (boardRows: number, boardCols: number, totalBombsCount: number): void => {
      dispatch(setBoardRows({ boardRows }));
      dispatch(setBoardCols({ boardCols }));
      dispatch(setTotalBombsCount({ totalBombsCount }));
      dispatch(initBombsLeftCount());

      dispatch(setGameStartStatus({ status: false }));
      dispatch(setGameOverStatus({ status: false }));
      dispatch(setGameWonStatus({ status: false }));
      dispatch(initTileClickCount());
    },
    []
  );

  const onMenuButtonClick = () => {
    if (isMenuVisible) setIsMenuVisible(false);
    else setIsMenuVisible(true);
  };

  const onMenuClick = useCallback(() => {
    setIsMenuVisible(false);
  }, []);

  const onBeginnerClick = () => {
    setLevel('Beginner');
  };
  const onIntermediateClick = () => {
    setLevel('Intermediate');
  };
  const onExpertClick = () => {
    setLevel('Expert');
  };
  const onCustomClick = () => {
    setLevel('Custom');
    setIsModalVisible(true);
  };

  return (
    <>
      <button type="button" onClick={onMenuButtonClick}>
        Menu
      </button>
      {isMenuVisible && (
        <div className="menu" ref={menuRef} onClick={onMenuClick}>
          <button type="button" onClick={onBeginnerClick} className="menu-item">
            <div>{level === 'Beginner' && <CheckIcon />}</div>
            <span>Beginner</span>
          </button>
          <button
            type="button"
            onClick={onIntermediateClick}
            className="menu-item"
          >
            <div>{level === 'Intermediate' && <CheckIcon />}</div>
            <span>Intermediate</span>
          </button>
          <button type="button" onClick={onExpertClick} className="menu-item">
            <div>{level === 'Expert' && <CheckIcon />}</div>
            <span>Expert</span>
          </button>
          <button type="button" onClick={onCustomClick} className="menu-item">
            <div>{level === 'Custom' && <CheckIcon />}</div>
            <span>Custom</span>
          </button>
        </div>
      )}
      {isModalVisible && (
        <GameSetupModal
          setIsModalVisible={setIsModalVisible}
          setBoardProps={setBoardProps}
        />
      )}
    </>
  );
}
