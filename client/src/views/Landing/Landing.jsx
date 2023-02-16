import styles from "./Landing.module.css"
import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div className={styles.landingContainer} >
            <h1>PI Henry Countries</h1>
            
            
            <Link to="/home">
                <button className='button' >Ingresar</button> 
            </Link>

            <footer className={styles.footer}>
                <p>By Noelia Lombardo for Henry - Copryrigth 2023</p> 
      
            </footer>
        </div>
    )
}

export default Landing