import { Link, useLocation } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
  const location = useLocation();

  // Si la ruta actual es diferente de "/home", no se muestra el botón de cerrar
  const showCloseButton = location.pathname === "/home";

  return (
    <div className={styles.card}>
      {showCloseButton && (
        <button onClick={props.onClose} className={styles.buttonX}>
          X
        </button>
      )}
      <div className={styles.icon}>
        <img src={props.img} alt="" className={styles.img} />
      </div>
      <p>{props.name}</p>
      <div className={styles.content}>
        <p>Continent: {props.continent}</p>
        <button className={styles.moreInfo}>
          <Link to={`/home/${props.id}`}>Mas info</Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
