import React, {useState} from 'react'
import styles from './SearchBar.module.css'


export default function SearchBar({onSearch}) {
   const [searchCountry, setSearchCharacter] = useState("")
   const changeHandler = (event) => {
      setSearchCharacter(event.target.value)
   }

   return (
      <div> 
        <input 
         type='text' 
         name="search" 
         placeholder="Buscar Pais"
         onChange={changeHandler}/>
      
        <button onClick={()=> onSearch(searchCountry)} className={styles.buttonAgregar}>Buscar</button> 
      
      </div>
   );
}
