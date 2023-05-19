import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';

function ShowMealRequests(){
    const[mealReq,setMealReq]=useState([]);

    const [isDelete, setIsDelete] = useState(false);
    useEffect(()=>{
        axios.get(`http://localhost:7000/aip/requestMeal/requests`)
        .then((res)=>{
            setMealReq(res.data);
        })
        .catch((err)=>[
            console.log(err)
        ])
        setIsDelete(false)
    },[isDelete]);

    function handleClick(eID){

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:7000/aip/requestMeal/requests/${eID}`)
                .then(()=>{
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                      setIsDelete(true)
                })
                .catch((err)=>{
                    console.log(err)
                })
          
            }
          })
    }

    return(
        <div className="meal-details">
            {mealReq.map((mealReqdata)=>(
                <div>
                <strong><p>{mealReqdata.RequestrFood}</p></strong>
                <button className="delete" onClick={() => handleClick(mealReqdata._id)} >delete</button> 
                <br/>
                </div>
            ))}
            
        </div>
    )
}
export default ShowMealRequests; 