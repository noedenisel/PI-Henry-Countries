import React, { useState } from 'react';
import styles from './SearchBar.module.css';

import lupa from "../../img/lupa.png"

export default function SearchBar({ onSearch }) {
  const [searchCountry, setSearchCountry] = useState('');

  const changeHandler = (event) => {
    setSearchCountry(event.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        name="search"
        placeholder="Buscar País"
        value={searchCountry}
        onChange={changeHandler}
      />
      
      <img src={lupa} alt="Buscar" className={styles.iconNav} onClick={() => onSearch(searchCountry)}/>

    </div>
  );
}

