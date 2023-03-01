import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Cards from "../../components/Cards/Cards"
import {  getAllCountries, orderByName, orderByPopulation, filterByContinent, filterActivityBySeason } from "../../redux/actions/actions"

import styles from './AllCountries.module.css'

const AllCountries = () => {
    const dispatch = useDispatch() 
    const countries = useSelector(state => state.countries) //? obtengo el estado actual de la lista de países del store

    const [selectedSeason, setSelectedSeason] = useState('');

    useEffect(() => { //? despues de montar el componente
      if (!countries.length) { //? verifico si el array de countries esta vacio
          dispatch(getAllCountries()) //? me traigo todos los paises
      }
    }, [dispatch, countries.length])
  
    //? paginacion
    
    const [currentPage, setCurrentPage] = useState(1)
    const [order, setOrder] = useState('')

    const countriesPerPage = 10 //? cantidad de paises por pagina
    const pagesToShow = 5 //? cantidad de nros de paginas que quiero mostrar (para que no sea una cantidad de nros interminables)
  
    const indexOfLastCountry = currentPage * countriesPerPage //? calcul0 el índice del último país que debe aparecer en la página actual. Para la primera página, este valor es "10" 
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage //?calculo el índice del primer país que debe aparecer en la página actual. Para la primera página, este valor es "0" 
    
    const currentCountries = countries
    .filter(country => !selectedSeason || country.activities.some(activity => activity.season === selectedSeason))
    .slice(indexOfFirstCountry, indexOfLastCountry);

    
    //? creo un nuevo array "currentCountries" que contiene los países que deben mostrarse en la página actual. La función "slice" se utiliza para obtener una porción de la matriz "countries" que contiene los países correspondientes a los índices "indexOfFirstCountry" y "indexOfLastCountry".
    const totalPages = Math.ceil(countries.length / countriesPerPage) //? calculo el número total de páginas que hay en la lista de países redondeando para arriba para que se muestren todas las paginas que necesito
    const maxPages = Math.min(currentPage + Math.floor(pagesToShow/2), totalPages) //? calculo el número máximo de páginas que se deben mostrar en la paginación
    const minPages = Math.max(currentPage - Math.floor(pagesToShow/2), 1)
    const pages = [...Array(maxPages - minPages + 1).keys()].map(i => minPages + i) //? creo un array de números para la paginación. Con "[...Array(maxPages - minPages + 1).keys()]" creo un array de nros que comienza en 0 y termina en el número de páginas que se deben mostrar. Con el map los valores en la matriz para que comiencen en "minPages" en lugar de cero. Esto significa que si "minPages" es "3" y "maxPages" es "7", entonces "pages" sería una matriz de [3, 4, 5, 6, 7].

   
    function handleFilterByContinent(event){
      dispatch(filterByContinent(event.target.value))
    }
  
    function handleOrderByName(event){
      dispatch(orderByName(event.target.value))
      setCurrentPage(1);
      setOrder(`Ordered ${event.target.value}`)
    }
  
    function handleOrderByPopulation(event){
      dispatch(orderByPopulation(event.target.value))
      setCurrentPage(1);
      setOrder(`Ordered ${event.target.value}`)
    }

    function handleSeasonSelect(event){
      setSelectedSeason(event.target.value);
    }
    
    function handleActivityBySeason(season){
      dispatch(filterActivityBySeason(season));
      setCurrentPage(1);
      setOrder(`Ordered ${season}`);
    }
    
  return (
    <div className= {styles.AllContainer} >
 
        <div className= {styles.filtersContainer}>
            <div>
                Ordenar por nombre:  
                <select name= "order" id= "" onChange={(event) => handleOrderByName(event)} > 
                    <option value = "" >Select...</option>
                    <option value="All">All</option>
                    <option value = "Ascendente">Ascendente</option>
                    <option value = "Descendente"> Descendente</option>
                </select>
            </div>

            <div>
                Ordenar por poblacion: 
                <select name= "order" id= "" onChange={(event) => handleOrderByPopulation(event)} > 
                    <option value = "" >Select...</option>
                    <option value="All">All</option>
                    <option value = "Ascendente">Ascendente</option>
                    <option value = "Descendente"> Descendente</option>
                </select>
            </div>

            <div>
                Filtrar por continente:
                <select name = "Continent" id= "" onChange = { handleFilterByContinent } >  {/* //!Tiene un pequeño delay */}
                    <option value = "">Select...</option>
                    <option value="Continents">All</option> 
                    <option value = "South America">Sur America</option>  {/* //TODO: combinar con america del norte */}
                    <option value = "North America">Norte America</option> {/* //TODO: combinar con america del sur */}
                    <option value = "Europe">Europa</option>
                    <option value = "Africa"> Africa</option> 
                    <option value= "Asia">Asia</option> 
                    <option value = "Oceania"> Oceania</option>
                    <option value = "Antarctica"> Antartida</option> 
                </select> 
            </div>

            <div>
                Filtrar por temporada:
                <select name="Season" id="" onChange={handleSeasonSelect}>
                  <option value="">Select...</option>
                  <option value="Verano">Verano</option>
                  <option value="Otoño">Otoño</option>
                  <option value="Invierno">Invierno</option>
                  <option value="Primavera">Primavera</option>
                </select>
            </div>

            
        </div>
    
        <div>
            <Cards countries={currentCountries}  />
        </div>
        
        <div className={styles.pagination}>
            {currentPage > 1 &&
                <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
            }
            {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? 'active' : ''}
                  style={currentPage === page ? { backgroundColor: 'yellow' } : {}}
                >
                {page}
                </button>

            ))}
            {currentPage < totalPages &&
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            }
        </div> 
    </div>
  )
}

export default AllCountries;