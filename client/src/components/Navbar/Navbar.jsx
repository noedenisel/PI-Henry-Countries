import { Link, useLocation } from "react-router-dom"
import styles from "./Navbar.module.css"
import SearchBar from "../SearchBar/SearchBar"

const NavBar = ({onSearch}) => {

    const location = useLocation()

    return (
        <div className={styles.NavBar}>

            {/** SearchBar */}

            {location.pathname === "/home"  &&
                <SearchBar  onSearch={onSearch}></SearchBar>
            }

            {/**Links en Home */}
        
            { location.pathname === "/home" &&
                <button><Link to = "/all"> Todos los paises </Link> </button>
            } 

            {/**Links en Todos los paises  */}

            { location.pathname === "/all" &&
                <button><Link to = "/home"> Pagina principal </Link> </button>
            }

            { location.pathname === "/all" &&
                <button><Link to = "/create"> Crear Actividad Turistica </Link> </button>
            } 

            {/**Links en Crear Actividad */}
        
            { location.pathname === "/create" &&
                <button><Link to = "/home"> Pagina principal </Link> </button>
            }

            { location.pathname === "/create" &&
                <button><Link to = "/all"> Todos los paises </Link> </button>
            }
        
        </div>
    )
}

export default NavBar