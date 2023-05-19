import { MealContext } from "../context/mealContext";
import { useContext } from "react";

export const UseMealContext=()=>{
    const context=useContext(MealContext)

    if(!context){
        throw Error('useMealContext must be used inside an MealContextProvider')
    }

    return context
}