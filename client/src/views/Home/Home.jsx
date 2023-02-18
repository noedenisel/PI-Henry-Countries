import React from 'react';
import { useSelector } from 'react-redux';
import Cards from "../../components/Cards/Cards";

const Home = () => {
  const countries = useSelector((state) => state.countries)
  const searchName = useSelector((state) => state.searchName)
//? para obtener el estado de búsqueda del store de Redux

  return (
    <div>
      {searchName === '' && <Cards countries={countries} />} 
    </div>
  );
}

export default Home;
