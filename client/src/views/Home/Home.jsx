import syles from "./AllCountries.module.css"
import CardContainer from "../../components/CardContainer/CardContainer"
import { useEffect , useSelector} from "react"
import { useDispatch } from "react-redux"
import {
    getAllCountries,
    // getCountryByName,
    // getCountryById,    
	// getActivities,
	// postActivity,    
	// filterByContinent,
    // filterByActivity,
    // filterByName,
    // filterByPopulation,
} from "../../redux/actions/actions"


const AllCountries = () => {
    

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)

    useEffect(() => {
        if (!countries.length) {
            dispatch(getAllCountries());
        }
    }, [dispatch, countries.length]);

    

    return (
        <div className={syles.containerAl}>
            <CardContainer></CardContainer>
        </div>
    )
}

export default AllCountries