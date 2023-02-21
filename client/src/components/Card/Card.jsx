import { Link } from "react-router-dom"
import styles from "./Card.module.css"

const Card = (props) => {


    return (
        <div className={styles.card}>
            <button onClick={props.onClose} className={styles.button}>X</button> 
            <div className={styles.icon}>
                <img src= {props.img} alt="" className={styles.img}></img>
            </div>
                <p>{props.name}</p>
            <div className={styles.content}>
                <p>Continent: {props.continent}</p>
                 <button>
                 <Link to= {`/home/${props.id}`}>
                    Mas info
                 </Link>
                 </button> {/* //TODO: ponerle el link y estilos */}
            </div>
        </div>
    )
}

export default Card