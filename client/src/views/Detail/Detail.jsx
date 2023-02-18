import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
// import styles from './Detail.module.css'

const Detail = (props) => {


    const { id } = useParams ();
    const [ country, setCountry] = useState({
        image: "",
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
   
            <h1> {country.name }</h1>
            <h2> {country.countryCode }</h2>
            <h2>  {country.capital }</h2>
            
            <h2> {country.continent }</h2>
            <h2> {country.subregion }</h2>
            <h2> {country.population }</h2>
            <h2> {country.touristActivities }</h2>
            <img src={country.image}></img>

            <div>
                <button onClick={()=> navigate("/home")}>Regresar a la página principal</button>
            </div>
    
    
        </div>
    )
}

export default Detail