import React from 'react';
import {BrowserRouter} from 'react-router-dom';

//internal imports
import MainRouter from './components/MainRouter';


function App() {
  return (
    <BrowserRouter>
    <MainRouter/>
    </BrowserRouter>
  );
}

export default App;
