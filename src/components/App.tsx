import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Paths from './Paths';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Paths />
    </BrowserRouter>
  );
};

export default App;
