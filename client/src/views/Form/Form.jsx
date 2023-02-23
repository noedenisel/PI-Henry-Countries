import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getAllCountries, postActivity } from "../../redux/actions/actions"

import styles from "./Form.module.css"

export default function Form() {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)
    const countriesNames = countries.map((country) => {

        return { label: country.name, value: country.id }
})

    const navigate = useNavigate()
    const activities = useSelector((state) => state.activities)


    useEffect(() => {
    dispatch(getAllCountries())
    }, [dispatch])

    const [input, setInputData] = useState({
        name: "",
        difficulty: "",
        duration: "",
    season: "",
    countryId: [],
    })

const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    })

const handleInputChange = (e) => {
    setInputData({
    ...input,
    [e.target.name]: e.target.value,
    })
    setErrors(
        validate({
        ...input,
        [e.target.name]: e.target.value,
        })
    )
    }

    const handleSelect = (e) => {
        setInputData({
        ...input,
        countryId: [...input.countryId, e.target.value],
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.name && input.difficulty && input.season && input.countryId.length) {
            dispatch(postActivity(input))
            alert("Actividad creada correctamente")
            setInputData({
                name: "",
                difficulty: 0,
                duration: 0,
                season: "",
                countryId: [],
        })
        navigate("/home")
        } else {
            e.preventDefault()
            alert("Por favor complete todos los campos")
        }
    }

    const handleDelete = (e, d) => {
    e.preventDefault()
    setInputData({
    ...input,
    countryId: input.countryId.filter((country) => country !== d),
    })
    }

    const validate = (input) => {
        let errors = {}

        if (!input.name) {
            errors.name = "Ingrese un nombre"
        } else if (activities.map((activity) => activity.name).some((name) => name === input.name)) {
            errors.name = "El nombre ingresado ya existe"
        }
  
        if (/^((?:[1-9]|1[0-9]|2[0-4])?)$/.test(input.duration)) {
            setErrors({ ...errors, duration: "" })
        } else {
            errors.duration = "La duracion de la actividad debe ser entre 1 y 24 hs"
        }
  
        if (!input.difficulty || input.difficulty < 1 || input.difficulty > 5) {
            errors.difficulty = "Ingrese una valor para identificar la dificultad"
        }
        
        if (!input.duration) {
            errors.duration = "Ingrese la duracion"
        }
  
        if (!input.season) {
            errors.season = "Ingrese la temporada"
        }
  
    return errors
  
    }



    return (
        <div className={styles.formContainer}>
    
            <h1> Crear Actividad turistica</h1>
            <form onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <label>Nombre</label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={(e) => handleInputChange(e)}
                    />
                    {<p className={styles.danger}>{errors.name ? errors.name : null}</p>}
                </div>
                
                <div>
                    <label>Dificultad</label>
                    <input
                        type='number'
                        min='1'
                        max='5'
                        value={input.difficulty}
                        name='difficulty'
                        onChange={(e) => handleInputChange(e)}
                    />
                    (min: 1 - max: 5)
                    {<p className={styles.danger}>{errors.difficulty ? errors.difficulty : null}</p>}
                </div>
                
                <div>
                    <label>Duracion:</label>
                    <input
                        type='number'
                        value={input.duration}
                        name='duration'
                        onChange={(e) => handleInputChange(e)}
                    /> horas
                    {<p className={styles.danger}>{errors.duration ? errors.duration : null}</p>}
                </div>
                
                <div>
                    <span>Temporada:</span>
                    <select className="input" name="season" onChange={(e) => handleInputChange(e)}>
                        <option value="empty"> </option>
                        <option value="Invierno" key="Invierno">Invierno</option>
                        <option value="Otoño" key="Otoño">Otoño</option>
                        <option value="Primavera" key="Primavera">Primavera</option>
                        <option value="Verano" key="Verano">Verano</option>
                    </select>
                    {errors.season && <p className="errors">{errors.season}</p>}
                </div>
                
                <div>
                    <span>Paises donde se puede practicar:</span>
                    <div> 
                        <select multiple value='countryId' onChange={(e) => handleSelect(e)}>
                            {countriesNames.sort((a, b) => a.label.localeCompare(b.label)).map(country => {
                            return <option key={country.value} value={country.value}>{country.label}</option>
                            })}
                        </select>
                    </div>
                </div>
                
            
            <div>
                <span>Usted esta creando una actividad turistica para los siguientes paises: </span>
                    {input.countryId.map((c, index) => (
                <div key={index}>
                    <p>{c}</p>
                    <button onClick={(e) => handleDelete(e, c)}>X</button>
                </div>
                ))}    
            </div>
            
            <div>
                <button type='submit'> Confirmar</button>
            </div>
            
            </form>
        </div>
    )
}


    