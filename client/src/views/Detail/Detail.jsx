import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"

// import styles from './Detail.module.css'

const Detail = (props) => {


    const { id } = useParams ();
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
          } else {
             window.alert('No hay personajes con ese ID');
          }
       })
       return setCountry({});
 }, [id]);


    const navigate = useNavigate();
    return (
        <div >
            <img src= {country.flag} alt="" ></img>
            <h1> {country.name }</h1>
            <h2> {country.id}</h2>
            <h2>  {country.capital }</h2>
            
            <h2> {country.continent }</h2>
            <h3> {country.subregion }</h3>
            <h3> Población: {country.population }</h3>
            <h2> Actividades turísticas: {country.touristActivities }</h2>
            


            <div>
                <button onClick={()=> navigate("/create")}>Crear actividad turistica</button>
            </div>
            <br></br>
            <div>
                <button onClick={()=> navigate("/home")}>Regresar a la página principal</button>
            </div>
        
    
        </div>
    )
}

export default Detail