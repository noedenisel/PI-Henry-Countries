import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cards from "../../components/Cards/Cards"
import { getAllCountries } from "../../redux/actions/actions";

const AllCountries = ({onClose}) => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
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
    <div>


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