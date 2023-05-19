import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';
import  Storage  from "../FireBase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function MealUpdate(){
    const navigate = useNavigate()
    const[meal,setMeal]=useState([]);
    const {id}=useParams();
    const [image,setImage]=useState(meal.image)

    const [file, setFile] = useState("");

    const [percent, setPercent] = useState(0);

    const [foodItem,setFoodItem]=useState(meal.foodItem)
    const [weightPrePerson,setWeightPrePerson]=useState(meal.weightPrePerson)

    //axios.get(`http://localhost:7000/api/meal/${id}`)
    
    useEffect(()=>{
        axios.get(`http://localhost:7000/api/meal/${id}`)
        .then((res)=>{
            setMeal(res.data);
        })
        .catch((err)=>[
            console.log(err)
        ])
    },[]);

    

    function updateMeal(event){
        event.preventDefault()

        const updated={
            image,foodItem,weightPrePerson
        }

        axios.patch(`http://localhost:7000/api/meal/${id}`,updated)
        .then((res)=>{
            console.log(res)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'meal has been updated',
                showConfirmButton: false,
                timer: 1500
              })
            navigate('/')    
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    const handleChange = (event)=>{
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
        
        const storageRef = ref(Storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        
        
        uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
        
            // update progress
            setPercent(percent);
        },
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                //console.log(url);
                setImage(url);
                console.log(image)
            });
        }
        );
    }

    return(
        <div className="backcolor">
            <h3>update the details of {meal.foodItem}</h3>

            <label>Food item image</label>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload} className="update">Upload to Firebase</button>

            <form className="create">

                <label>Food item name</label>
                <input type="text"
                onChange={(event)=>setFoodItem(event.target.value)}
                defaultValue={meal.foodItem}/>

                <label>weightPrePerson in garms/g</label>
                <input type="number"
                onChange={(event)=>setWeightPrePerson(event.target.value)}
                defaultValue={meal.weightPrePerson}/>

                <button onClick={updateMeal}>update MealDetails</button>
            </form>
        </div>
    )
}
export default MealUpdate