import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { getAllActivities } from "../../redux/actions/actions";

import styles from './Detail.module.css';

const Detail = (props) => {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);
    const navigate = useNavigate();
    const { id } = useParams();
    const [ country, setCountry] = useState({
        flag: "",
        name: "",
        countryCode: "",
        continent: "",
        capital: "", 
        subregion: "",
        population: "",
        touristActivities: []
    });

    // Nuevo selector para obtener las actividades turísticas asociadas con el país actual
    const CountryActivity = useSelector(state => {
        return state.activities.filter(activity => activity.countryId === id);
    });

    useEffect(() => {
        fetch(`http://localhost:3001/countries/${id}`)
            .then((response) => response.json())
            .then((country) => {
                if (country.name) {
                    setCountry(country);
                } else {
                    window.alert('No hay actividades con ese ID');
                }
            });

        // Actualizar la lista de actividades cada vez que cambie el país actual
        dispatch(getAllActivities());
    }, [id, dispatch]);

    return (
        <div className={styles.detailContainer}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <img src={country.flag} alt="" className={styles.img}></img>
                </div>
                
                <div className={styles.heading}> 
                    <h1>{country.name}</h1>
                    <span className={styles.category}>-{country.id}-</span>
                    <div className={styles.author}> 
                        <h2>Capital: {country.capital}</h2>
                        <h2>Continente: {country.continent}</h2>
                        <h4>{country.subregion}</h4>
                        <span className={styles.name}>
                            <h3>Población: {country.population}</h3>
                        </span> 
                        <h2>Actividades turísticas:</h2>

                        {/* Renderizar la lista de actividades dentro del campo "Actividades turísticas" en su JSX */}
                        <ul>
                            {activities.map((activity) => (
                                <li key={activity.id}>{activity.name}</li>
                            ))}
                        </ul>
                    </div>
                </div> 
            </div>  
            
            <div>
                <button onClick={() => navigate("/create")}>Crear actividad turistica</button>
            </div>

            <div>
                <button onClick={() => navigate("/home")}>Regresar a la página principal</button>
            </div>
        </div>
    );
};

export default Detail;
