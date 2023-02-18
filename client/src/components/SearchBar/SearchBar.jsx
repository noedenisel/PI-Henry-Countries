import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../redux/actions/actions';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, cle }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const changeHandler = (event) => {
    setName(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await dispatch(getCountryByName(name));
      onSearch(data.length ? data : null);
      setName(''); // Limpia el input después de llamar a onSearch
    } catch (error) {
      console.log(error);
      onSearch(null);
    }
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='search'
          value={name}
          placeholder='Buscar país'
          className={styles.input}
          onChange={changeHandler}
        />
        <button type='submit'>Buscar</button>
      </form>
    </div>
  );
}
