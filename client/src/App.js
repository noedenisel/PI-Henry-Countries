import './App.css';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Form from './views/Form/Form';
import Detail from './views/Detail/Detail';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App" >
    <Routes>
      <Route exact path="/" element= {<Landing></Landing>} ></Route>
      <Route path="/home" element= {<Home></Home>} ></Route>
      <Route path="/create" element= {<Form></Form>} ></Route>
      <Route path="/:id" element= {<Detail></Detail>} ></Route>
    </Routes>
 
    </div>
  );
}

export default App;
