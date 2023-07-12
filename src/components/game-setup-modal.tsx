import GameSetupForm from '@components/game-setup-form';
import '@styles/style.scss';

interface GameSetupModalProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardProps: (
    boardRows: number,
    boardCols: number,
    totalBombsCount: number
  ) => void;
}
export default function GameSetupModal({
  setIsModalVisible,
  setBoardProps
}: GameSetupModalProps) {
  const onModalBackgroundClick = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <div className="modal">
        <div className="">
          <h1>Custom Game Setup</h1>
          <GameSetupForm
            setIsModalVisible={setIsModalVisible}
            setBoardProps={setBoardProps}
          />
        </div>
      </div>
      <div onClick={onModalBackgroundClick} className="modal-background"></div>
    </div>
  );
}
