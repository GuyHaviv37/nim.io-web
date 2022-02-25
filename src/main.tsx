import React from 'react'
import ReactDOM from 'react-dom'
import '../index.css'
import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenuScreen/>}/>
        <Route path="/game/:roomId/:player" element={<GameScreen/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
