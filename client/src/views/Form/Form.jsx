import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getAllCountries, postActivity } from "../../redux/actions/actions"

import styles from "./Form.module.css"

export default function Form(props) {
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
        navigate("/all")
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
            
            <form onSubmit={(e) => handleSubmit(e)} className= {styles.form}>
                <div>
                    <label className={styles.lb} for = "name"> Nombre: </label>
                    <input className={styles.infos}
                        type='text'
                        value={input.name}
                        name='name'
                        id = "name"
                        onChange={(e) => handleInputChange(e)}
                        
                    />
                    {<p className={styles.error} >{errors.name ? errors.name : null}</p>}
                </div>
                
                <div>
                    <label className={styles.lb} for = "dificultad"> Dificultad: </label>
                    <input
                    className={styles.infos}
                        type='number'
                        min='1'
                        max='5'
                        value={input.difficulty}
                        name='difficulty'
                        id = "dificultad"
                        onChange={(e) => handleInputChange(e)}
                    /> <span className={styles.addText}>(min: 1 - max: 5)</span>
                    {<p className={styles.error} >{errors.difficulty ? errors.difficulty : null}</p>}
                </div>
                
                <div>
                    <label className={styles.lb} for= "duracion"> Duración: </label>
                    <input
                    className={styles.infos}
                        type='number'
                        value={input.duration}
                        name='duration'
                        id = "duracion"
                        onChange={(e) => handleInputChange(e)}
                    /> <span className={styles.addText}> horas </span>
                    {<p className={styles.error} >{errors.duration ? errors.duration : null}</p>}
                </div>
                
                <div>
                    <span className={styles.lb} for = "season"> Temporada: </span>
                    <select className="input" name="season" onChange={(e) => handleInputChange(e)}>
                        <option value="empty"> </option>
                        <option value="Invierno" key="Invierno">Invierno</option>
                        <option value="Otoño" key="Otoño">Otoño</option>
                        <option value="Primavera" key="Primavera">Primavera</option>
                        <option value="Verano" key="Verano">Verano</option>
                    </select>
                    {errors.season && <p className={styles.error} >{errors.season}</p>}
                </div>
             
                <div>
                    <span className={styles.lb} for = "countries"> Paises donde se puede practicar: </span>
                    <div className={styles.countrySelect}> 
                        <select multiple value='countryId' onChange={(e) => handleSelect(e)}>
                            {countriesNames.sort((a, b) => a.label.localeCompare(b.label)).map(country => {
                            return <option key={country.value} value={country.value}>{country.label}</option>
                            })}
                        </select>
                    </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <br></br>
                    {input.countryId.length > 0 && (
                        <span className={styles.alertConfirm}> Usted está creando una actividad turística para los siguientes países: </span>)}
                    {input.countryId.map((c) => (
                        <div key={c} className={styles.countriesList} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <span className={styles.paisId}>{c}</span>
                            <button onClick={(e) => handleDelete(e, c)} className={styles.btnX}>X</button>
                        </div>
                    ))}
                    <div className={styles.buttons}>
                        <button type='submit' className={styles.send}>Confirmar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


    