import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MealContextProvider } from './context/mealContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MealContextProvider>
    <App />
    </MealContextProvider>
  </React.StrictMode>
);

