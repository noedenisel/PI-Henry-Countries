import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cards from "../../components/Cards/Cards"
import { filterByContinent, getAllCountries, orderByName } from "../../redux/actions/actions";

const AllCountries = ({onClose}) => {
  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('')

  const countriesPerPage = 10;
  const pagesToShow = 5;

  useEffect(() => {
    if (!countries.length) {
        dispatch(getAllCountries())
    }
  }, [dispatch, countries.length]);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(countries.length / countriesPerPage);
  const maxPages = Math.min(currentPage + Math.floor(pagesToShow/2), totalPages);
  const minPages = Math.max(currentPage - Math.floor(pagesToShow/2), 1);
  const pages = [...Array(maxPages - minPages + 1).keys()].map(i => minPages + i);


  function handleFilterByContinent(event){
    dispatch(filterByContinent(event.target.value))
  }


  function handleOrderByName(event){
    dispatch(orderByName(event.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`)
};

  return (
    <div>
        Ordenar por nombre: 
            <select name= "order" id= "" onChange={(event) => handleOrderByName(event)} > 
                <option value = "" >Select...</option>
                <option value="All">All</option>
                <option value = "Ascendente">Ascendente</option>
            
                <option value = "Descendente"> Descendente</option>
            </select>
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
   

   <Cards countries={currentCountries} onClose={onClose} />
        <div>
            {currentPage > 1 &&
                <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
            }
            {pages.map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? 'active' : ''}>
                    {page}
                </button>
            ))}
            {currentPage < totalPages &&
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            }
        </div> 
    </div>
  );
};

export default AllCountries;