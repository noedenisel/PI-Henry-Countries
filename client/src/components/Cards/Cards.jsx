import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getAllCountries } from "../../redux/actions/actions";

const Cards = ({ countries, onClose }) => { 

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div className={styles.containerCard}>
      {countries.map((country) => (
        <Card
          key={country.id} 
          img={country.flag}
          name={country.name}
          continent={country.continent}
          id = {country.id} 
          onClose= {() => onClose(country.id)}
        /> 
        
      ))}

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

export default Cards;