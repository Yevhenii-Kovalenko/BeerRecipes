import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import RecipeDetails from './components/RecipeDetalis';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
