import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = ({ countries }) => {
  return (
    <div className={styles.containerCard}>
      {countries.map((country) => (
        <Card
          key={country.id} 
          img={country.flag}
          name={country.name}
          continent={country.continent}
        />
      ))}
    </div>
  );
};

export default Cards;