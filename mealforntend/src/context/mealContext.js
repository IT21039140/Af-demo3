import { createContext, useReducer} from 'react'

export const MealContext = createContext()

export const mealReducer=(state,action)=>{
    switch(action.type){
        case 'SET_MEAL':
            return{
                meals:action.payload
            }
            case 'CREATE_MEAL':
                return{
                    meals:[action.payload,...state.meals]
                }
            case 'DELETE_MEAL':
                return{
                    Meals:state.meals.filter((w)=>w._id!==action.payload._id)
                }
            default:
                return state
    }
}
export const MealContextProvider=({children})=>{
    const [state, dispatch]=useReducer(mealReducer, {
        products:null
    })

    return(
        <MealContext.Provider value={{...state,dispatch}}>
            {children}
        </MealContext.Provider>
    )
}