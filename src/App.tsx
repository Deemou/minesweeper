import Header from '@components/header';
import Board from '@components/board';
import Menu from '@/components/menu';
import '@styles/style.scss';
import '@styles/app.scss';

function App() {
  return (
    <div className="App">
      <div className="game-container">
        <div className="menu-container">
          <Menu />
        </div>
        <div className="board-container">
          <Header />
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
