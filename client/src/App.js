import './App.css'

//? React
import React, {useState} from "react"
import { Route, Routes , useLocation} from "react-router-dom"

//? componentes
import NavBar from './components/Navbar/Navbar'
import Cards from './components/Cards/Cards'

//? views
import Landing from './views/Landing/Landing'
import Form from './views/Form/Form'
import Detail from './views/Detail/Detail'
import AllCountries from "./views/AllCountries/AllCountries"


function App() {
  
  const [countries, setCountries] = useState([]);//definicion del estado, devuelve el array

  const location = useLocation()


  function onSearch(name) {
    // ? hace una busqueda
    fetch(`http://localhost:3001/countries?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCountries((oldCountries) => [...oldCountries, data[0]])
        } else {
          window.alert('No se encontraron resultados para el país ingresado.')
        }
      });
  }
  

  function onClose(id){ 
    setCountries(oldCountries => oldCountries.filter(country => country.id !== id))
  }

  return (
    <div className="App" >

    {location.pathname !== "/" && 
      <div>
        <NavBar onSearch={onSearch}></NavBar> 
      </div>
    }

    <Routes>
      <Route exact path="/" element= {<Landing></Landing>} />
      <Route path = "/home" element = {<Cards countries={countries} onClose={onClose}/>} />  
      <Route path = "/home/:id" element= {<Detail></Detail>} />
      <Route path = "/create" element= {<Form></Form>} />
      <Route path="/all" element= {<AllCountries ></AllCountries>} /> 
    </Routes>
 
    </div>
  );
}

export default App
