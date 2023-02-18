import axios from "axios"
import { useState } from "react"
import styles from "./Form.module.css"



export default function Form(props) {

    const [form, setForm ]= useState({
        name: "",
        difficulty: "",
        duration: "",
        season:"",
        countryId:[],  
    })

    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season:"",
    }

    )
    

    function handleInputChange(event) {

        const property = event.target.name
        const value = event.target.value
        
        validate({...form,[property]:value}) //? mando lo mismo a setForm y a validate, asi "pierde" el delay
        
        setForm({...form,[property]:value})

        setErrors(validate({...form, [property]: value}))
        
    }



    const validate = (form) => {
       if ( /^((?:[1-9]|1[0-9]|2[0-4])?)$/.test(form.duration)){
            setErrors({...errors, duration:""})
       } else {
        setErrors({...errors, duration:"La duracion de la actividad debe ser entre 1 y 24 hs"})
       }
    }

    function submitForm (event) {
        event.prevenDefault()
        axios.post("http://localhost:3001/activities", form)
        .then(res=>alert(res))
    }


    return (
        <div className={styles.formContainer}>

            <form onSubmit={submitForm}>
                <div>
                    <label> Nombre: </label>
                    <input type="text" value={form.name} onChange={handleInputChange} name="name"></input>
                </div>

                <div>
                    <label> Nivel de dificultad: </label> 
                    <select value={form.difficulty} onChange={handleInputChange} name="difficulty">
                        <option value="disabled">Selecione el nivel de dificultad</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>  
                    <span> (min: 1 - max: 5) </span>      
                </div>    
                
                <div>
                    <label> Duracion: </label>
                    <input type="text" value={form.duration} onChange={handleInputChange} name="duration"></input>
                    <span> horas</span> 
                    <br></br> 
                    <span>{errors.duration}</span>
                </div>    
                
                <div>
                    <label> Temporada: </label>
                    <select value={form.season} onChange={handleInputChange} name="season">
                        <option value="disabled">Seleccione una temporada</option>
                        <option>Otoño</option>
                        <option>Invierno</option>
                        <option>Primavera</option>
                        <option>Verano</option>
                    </select>     
                </div>

                <div>
                    <label> Pais donde se puede realizar: </label>
                    <input type="text" value={form.countryId} onChange={handleInputChange} name="countryId"></input>
                </div>
            </form>

            <br></br>
            
            <button className="buttonForm" type="submit">Crear actividad</button>
        </div>
    )
}

