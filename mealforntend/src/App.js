import{BrowserRouter, Routes, Route}from 'react-router-dom';

import MealHome from './pages/MealHomepage';
//import Navbar from './components/navbar';
import MealUpdate from './components/MealUpdate';
//import MealPlanCal from './pages/MealPlanPage';
import RequestMeal from './pages/requestMeal';
import ShowMealRequests from './pages/ShowMealRequest';
import MealFrom from './components/MealAddForm';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <div className='pages'>
          <Routes>
            <Route path="/" element={<MealHome />} />
            <Route path="/mealPlanAdd" element={<MealFrom/>} />
            <Route path="/updateMeal/:id" element={<MealUpdate/>} />
            <Route path="/addRequest" element={<RequestMeal />} />
            <Route path="/MealPlanRequest" element={<ShowMealRequests/>} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
