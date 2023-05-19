import { useState } from "react"
import { UseMealContext } from "../hooks/UseMealContext"
import  Storage  from "../FireBase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const MealFrom=()=>{
    const {dispatch}=UseMealContext()
    const [foodItem,setFoodItem]=useState('')
    const [weightPrePerson,setWeightPrePerson]=useState('')
    const [image,setImage]=useState('')

    const [file, setFile] = useState("");

    const [percent, setPercent] = useState(0);

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const meal={image,foodItem,weightPrePerson}

        const response=await fetch('/api/meal',{
            method:'POST',
            body:JSON.stringify(meal),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const json =await response.json()
        if(!response.ok){
            console.log(json.error);
        }

        if(response.ok){
            setFoodItem('')
            setWeightPrePerson('')
            setImage('')
            setFile(null)
            dispatch({type:'CREATE_MEAL', payload: json})
        }
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
                console.log(url);
                setImage(url);
                console.log(image)
            });
        }
        );

    }
    return(
        <div className="backcolor">
            <h3>Add a new Meal with weight per person</h3>
            
            <label>Food item image</label>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload} className="update">Upload to Firebase</button>

            <form className="create" onSubmit={handleSubmit}>
                

                <label>Food item name</label>
                <input type="text"
                onChange={(e)=>setFoodItem(e.target.value)}
                value={foodItem}/>

                <label>weightPrePerson in garms/g</label>
                <input type="number"
                onChange={(e)=>setWeightPrePerson(e.target.value)}
                value={weightPrePerson}/>

                <button>Add Product</button>
            </form>
        
        </div>
    )
}

export default MealFrom