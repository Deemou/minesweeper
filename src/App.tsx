import Header from '@components/header';
import Board from '@components/board';
import '@styles/style.scss';
import '@styles/app.scss';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Board />
      </div>
    </div>
  );
}

export default App;
