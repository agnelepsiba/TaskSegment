import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components';
import "./styles/variable.scss";
import "./styles/global.scss";
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
