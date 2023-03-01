import React from 'react'

import { useEffect} from 'react'

import { useDispatch } from 'react-redux'
import { getAllCountries } from "../../redux/actions/actions"

import Card from '../Card/Card'

import styles from './Cards.module.css'

const Cards = ({ countries, onClose }) => { 

  const dispatch = useDispatch();

  

  useEffect(() => {
    if (!countries.length) {
        dispatch(getAllCountries())
    }
  }, [dispatch, countries.length]);

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
    </div>
  )
}

export default Cards;