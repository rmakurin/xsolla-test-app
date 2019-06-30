import React from 'react';
import './App.css';
import Table from './Table';

const App: React.FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <a className='App-link Selected' href='#List'>
          Список транзакций
        </a>
        <a className='App-link' href='#PaymentRaiting'>
          Рейтинг платежных систем
        </a>
        <a className='App-link' href='#PaymentGraph'>
          График популярности
        </a>
      </header>
      <main>
        <Table />
      </main>
    </div>
  );
};

export default App;
