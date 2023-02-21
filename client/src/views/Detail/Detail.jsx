import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"

import styles from './Detail.module.css'

const Detail = (props) => {

    const [activities, setActivities] = useState([])

    const { id } = useParams ()
    const [ country, setCountry] = useState({
        flag: "",
        name: "",
        countryCode: "",
        continent: "",
        capital: "", 
        subregion: "",
        population: "",
        touristActivities: []
       
    })

   
    useEffect(() => {
        fetch(`http://localhost:3001/countries/${id}`)
           .then((response) => response.json())
           .then((country) => {
              if (country.name) {
                 setCountry(country);
                 setActivities(country.touristActivities);
              } else {
                 window.alert('No hay personajes con ese ID');
              }
           })
           return setCountry({})
     }, [id])
    


    const navigate = useNavigate()
    return (
        <div className= {styles.detailContainer}>
            <div className= {styles.card}>
                <div className={styles.cardImage}>
                    <img src= {country.flag} alt="" className={styles.img}></img>
                </div>
                
                <div className={styles.heading}> 
                    <h1> {country.name }</h1>
                        <span className={styles.category}> -{country.id}- </span>
          
            
                    <div className={styles.author}> 
                        <h2>Capital: {country.capital }</h2>
                        <h2> Continente: {country.continent }</h2>
                        <h4> {country.subregion }</h4>
                        <span className={styles.name}>
                            <h3> Población: {country.population }</h3>
                        </span> 
                        <h2> Actividades turísticas: </h2>
                        {/* {activities.length > 0 ? activities.map((activity) => (
                        <div key={activity.id}>
                        <h4>Nombre: {activity.name}</h4>
                        <p>Dificultad: {activity.difficulty}</p>
                        <p>Duración: {activity.duration} horas</p>
                        <p>Temporada: {activity.season}</p>
                        <hr />
                        </div>
                        )) : <p>No hay actividades turísticas.</p>}
                        */}
                    </div>
                </div> 
            </div>  
            
            <div>
                <button onClick={()=> navigate("/create")}>Crear actividad turistica</button>
            </div>

            <div>
                <button onClick={()=> navigate("/home")}>Regresar a la página principal</button>
            </div>
        </div>
    )
}

export default Detail
