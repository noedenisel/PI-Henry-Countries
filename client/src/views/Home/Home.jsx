import { useEffect , useSelector} from "react"
import { useDispatch } from "react-redux"
import { getAllCountries } from "../../redux/actions/actions"

import CardContainer from "../../components/CardContainer/CardContainer"
import styles from "./Home.module.css"



const Home = () => {
    

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)

    useEffect(() => {
        if (!countries.length) {
            dispatch(getAllCountries());
        }
    }, [dispatch, countries.length]);


    return (
        <div className={styles.home}> {/* //!no renderiza el style */}
            <CardContainer></CardContainer>
        </div>
    )
}

export default Home