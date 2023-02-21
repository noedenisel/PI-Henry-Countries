import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCountries, postActivity } from '../../redux/actions/actions'

import styles from './Form.module.css'
export default function Form() {

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const countriesNames = countries.map(country => { return { label: country.name, value: country.id } }).sort((a, b) => a.label.localeCompare(b.label))
    const activities = useSelector(state => state.activities)


    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])

    const [input, setInputData] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countryId: [],
    })

    const [errors, setErrors] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
    })

    // const [selectedCountries, setSelectedCountries] = useState([]);

    const handleInputChange = ((e) => {
        setInputData({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    )

    const handleSelect = ((event) => {
        // const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
        setInputData({
            ...input,
            countryId: [...input.countryId, event.target.value]
            // countryId: selectedIds,
        });
        // setSelectedCountries(selectedIds);
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.name && input.difficulty && input.season && input.countryId.length) {
            dispatch(postActivity(input));
            alert("You added a new Activity");
            setInputData({
                name: "",
                difficulty: 0,
                duration: 0,
                season: "",
                countryId: [],
            })
            // setSelectedCountries([]);
        } else {
            e.preventDefault()
            alert("You must complete every field correctly!");
        }
    }

    const validate = (input) => {
        let errors = {}

        if (!input.name) {
            errors.name = 'Por favor, complete el campo nombre!';
        } else if (activities.map(activity => activity.name).some(name => name === input.name)) {
            errors.name = "La actividad que desea crear ya existe"
        }

        if (!input.duration) {
            errors.duration = 'Por favor, indique una duracion!';
        }  
        
        if ( /^((?:[1-9]|1[0-9]|2[0-4])?)$/.test(input.duration)){
        setErrors({...errors, duration:""})
        } else {
        errors.duration = "La duracion de la actividad debe ser entre 1 y 24 hs"
        }
        
        if (!input.season) {
            errors.season = 'Por favor seleccione una temporada';
        }

        return errors
    }


    return (
        <div className={styles.formContainer}>
            Crear actividad turistica:
            
            <form onSubmit={(event => handleSubmit(event))}>
                <div>
                    <label> Nombre: </label>
                    <input 
                        type="text" 
                        name="name"
                        value={input.name} 
                        onChange={(event)=>handleInputChange(event)} 
                        />
                     {<p>{errors.name ? errors.name : null}</p>}
                </div>
                    
                <div>
                    <label> Nivel de dificultad: </label> 
                        <select 
                            name="difficulty"
                            value={input.difficulty} 
                            onChange={(event)=>handleInputChange(event)} 
                        >
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
                        <input 
                            type="number" 
                            value={input.duration} 
                            name="duration"
                            onChange={(event)=>handleInputChange(event)} 
                        />
                        <span> horas</span> 
                        <br></br> 
                    <p>{errors.duration ? errors.duration : null}</p>
                    </div>
            
                    <div>
                        <label> Temporada: </label>
                        <select 
                            value={input.season} 
                            name="season"
                            onChange={(event)=>handleInputChange(event)}
                        > 
                            <option value = "disabled">Seleccione una temporada</option>
                            <option value = "fall" key = "fall">Otoño</option>
                            <option value = "winter" key = "winter">Invierno</option>
                            <option value = "spring" key= "spring">Primavera</option>
                            <option value = "summer" key = "summer">Verano</option>
                        </select>     
                        <p>{errors.season}</p>
                    </div>
                
                    <div>
                        <label> Pais donde se puede realizar: </label>
                        <select 
                            value={input.countryId}
                            name="countryId"
                            onChange={(event) => handleSelect(event)}
                            multiple
                        >
                            {countriesNames.sort((a, b) => a.label.localeCompare(b.label)).map((country) => {
                                return <option key={country.value} value={country.value}>{country.label}</option>
                            })}
                        </select>
                    </div>
                    <br />
                    <button type="submit"> Create Activity</button>
                </form>
                <br />
            </div>
    )
}
