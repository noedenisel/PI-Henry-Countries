import { Link, useLocation } from "react-router-dom"

import SearchBar from "../SearchBar/SearchBar"

import styles from "./Navbar.module.css"

const NavBar = ({onSearch, name}) => {

    const location = useLocation()

    return (
        <div className={styles.NavBar}>

            {/** SearchBar */}
            {location.pathname === "/home"  &&
                <SearchBar  onSearch={onSearch}></SearchBar>
            }

            {/**Links en Home */}        
            { location.pathname === "/home" &&
                <button className={styles.link }><Link to = "/all"> Todos los paises </Link> </button>
            } 

            { location.pathname === "/home" &&
                <button className={styles.link}><Link to = "/create"> Crear Actividad Turistica </Link> </button>
            } 

            {/**Links en Todos los paises  */}
            { location.pathname === "/all" &&
                <button className={styles.link}><Link to = "/home"> Pagina principal </Link> </button>
            }

            { location.pathname === "/all" &&
                <button className={styles.link}><Link to = "/create"> Crear Actividad Turistica </Link> </button>
            } 
           
            {/**Links en Crear Actividad */}
            { location.pathname === "/create" &&
                <button className={styles.link}><Link to = "/home"> Pagina principal </Link> </button>
            }

            { location.pathname === "/create" &&
                <button className={styles.link}><Link to = "/all"> Todos los paises </Link> </button>
            }

          
            {/**Links en Detail */}        {/* //! No se renderizan */}
            { location.pathname === "/home" && location.search === `/home?name=${name}` &&
                <button className={styles.link}><Link to = "/all"> Todos los paises </Link> </button>
            }
        </div>
    )
}

export default NavBar