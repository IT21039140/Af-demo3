import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MealPlanCal() {

  const [foodItem, setFoodItem] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [weightPerP, setWeigthPerP] = useState(0);
  const[visible,setVisible]=useState(false)

  const data = {numberOfPeople, foodItem};
  //console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/meal/calculateWeight', data);
      setWeigthPerP(response.data[0].weightPrePerson);
    } catch (error) {
      console.error(error);
    }
    setVisible(true);
  };

  return (
    <div>
      <h1>Calculate Food Weight</h1>
      <form onSubmit={handleSubmit}>
        <label>Food item:</label>
        <input type="text" value={foodItem} onChange={(e) => setFoodItem(e.target.value)} />
        <br />
        <label>Number of people:</label>
        <input type="number" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
        <br />
        <button type="submit">Calculate</button>
      </form>
      <br/>
      <br/>

     {visible && <div>
        <p>Food Item: {foodItem}</p>
        <p>THe Entered Number of People: {numberOfPeople}</p>
        <p>Total Weigth For Person is : {weightPerP && weightPerP} g</p>

        {weightPerP && (
          <p>The total weight required is {weightPerP * numberOfPeople} g.</p>
        )}
      </div>}
      <br/>
      <br/>

      <Link to="/addRequest"><button className="btn1">request food items</button></Link>
    </div>
  );
}

export default MealPlanCal;