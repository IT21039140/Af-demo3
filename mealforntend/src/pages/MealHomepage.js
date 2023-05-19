import { useEffect} from "react";
import {Link} from 'react-router-dom'
import { UseMealContext } from "../hooks/UseMealContext";

//component
import MealDetails from "../components/MealDetails";
//import MealFrom from "../components/MealAddForm";

const MealHome=()=>{
    const {meals,dispatch}=UseMealContext()

    useEffect(()=>{
        const fetchMeal=async()=>{
            const response=await fetch('/api/meal')
            const json=await response.json()

            if(response.ok){
                dispatch({type:'SET_MEAL', payload:json})
            }
        }
        fetchMeal()

    },[])
    return(
        <div >
            <Link to={`/mealPlanAdd`}><button className="update" style={{marginRig:"100px"}}>Add a Meal Plan</button></Link>
            <Link to={`/MealPlanRequest`}><button className="update">See Requested Meal Plans</button></Link>
            <div className="meals">
                {meals&&meals.map((meal)=>(
                    <MealDetails key={meal._id} meal={meal}/>
                ))}
            </div>
        </div>
    );
}

export default MealHome