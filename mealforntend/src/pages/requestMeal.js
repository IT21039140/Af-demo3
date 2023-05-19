import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RequestMeal(){

    const[RequestrFood,setReqFood]=useState('');

    function Reqsubmit(event){
        event.preventDefault()

        const foodReqs={
            RequestrFood
        }
        axios.post(`http://localhost:7000/aip/requestMeal/requests`,foodReqs)
        .then((res)=>{
            console.log(res)
            alert("Request added Successfully !") 
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="backcolor">
            <form className="create" >
                <h1>Request a new food item to be added to the meal plans</h1>

                <label>Food item name</label>
                <input type="text"
                onChange={(event)=>setReqFood(event.target.value)}
                value={RequestrFood}
                />
                
                <button onClick={Reqsubmit}>Submit</button>

            </form>
        </div>
    )

}
export default RequestMeal;