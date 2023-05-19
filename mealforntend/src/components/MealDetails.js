import { UseMealContext } from "../hooks/UseMealContext";
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'


const MealDetails=({meal})=>{
    const {dispatch}=UseMealContext()

    
    const handleClick=async()=>{

        var response

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

                response= fetch('/api/meal/'+meal._id,{
                    method:'DELETE'
                })
                
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )

              

              response= fetch('/api/meal/'+meal._id,{
                method:'DELETE'
            })
            }
          })

           
        
        const json=await response.json()

        if(response.ok){
            dispatch({type:'DELETE_MEAL', payload:json})
        }
    }
    return(
        <div className="meal-details">
            <h4>{meal.foodItem}</h4><br/>
            <img src={meal.image} alt="food image" style={{width:"100px"}}/>
            <p><strong>sufficient weight for one person: </strong>{meal.weightPrePerson}</p>

            <Link to={`/updatemeal/${meal._id}`}><button className="update">update</button></Link>
            <button className="delete" onClick={handleClick}>delete</button>
        </div>
    )
}
export default MealDetails