import './App.css';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Form from './views/Form/Form';
import Detail from './views/Detail/Detail';
import AllCountries from "./views/AllCountries/AllCountries"
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';




function App() {
  
  const location = useLocation()

  return (
    <div className="App" >

    {location.pathname !== "/" && 
      <div>
      <NavBar></NavBar>
      </div>
      }

    <Routes>
      <Route exact path="/" element= {<Landing></Landing>} ></Route>
      <Route exact path="/home" element= {<Home ></Home>} ></Route>
      <Route exact path="/create" element= {<Form></Form>} ></Route>
      <Route exact path="/home/:id" element= {<Detail></Detail>} ></Route>
      <Route exact path="/all" element= {<AllCountries></AllCountries>} ></Route>
    </Routes>
 
    </div>
  );
}

export default App;
