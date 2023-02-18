import {
    GET_ALL_COUNTRIES,
    // GET_COUNTRY_BY_ID,
	// GET_ACTIVITIES,
	// POST_ACTIVITY,    
	FILTER_BY_CONTINENT,
    // FILTER_BY_ACTIVITY,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
} from "../actions/types"

const initialState = {
	countries : [],
	activities: [],

}

export default function rootReducer (state = initialState, action)  {
    switch(action.type){

		case GET_ALL_COUNTRIES: 
			return {
				...state, 
				countries: action.payload}

		// case GET_COUNTRY_BY_ID: 
		// 	return {...state, countryDetail: action.payload}

		// case GET_ACTIVITIES: 
		// 	return {...state, activities: action.payload}
        
		// case POST_ACTIVITY: 
		// 	return {
		// 		...state
		// 	}

		case ORDER_BY_NAME:
            const sorted = state.countries
            const isAscending = action.payload === "Ascendente";
            const sortedCountries = sorted.sort((a, b) =>
                isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            );
            return {
                ...state,
                countries: sortedCountries
            }

		case FILTER_BY_CONTINENT: 
		const Countries = 
			action.payload === "All"
			? state.countries
			: state.countries.filter(countries => countries.continent === action.payload);
		return {
			...state,
			countries: Countries
		}
		
		case ORDER_BY_POPULATION: 
			const orderByPopulation = state.allCountries
			if (action.payload === "Ascendente") {
				orderByPopulation.sort((a,b) => a.population - b.population)
			} else {
				orderByPopulation.sort((a,b)=> b.population - a.population)
			}
			return {
				...state, 
				countries: orderByPopulation}
		
		// case FILTER_BY_ACTIVITY: 
		// 	const allCountries = state.allCountries
		// 	const filterByActivity = action.payload === "All"
		// 	? allCountries : allCountries.filter(countries => {
		// 		const activity = countries.activities.map((activity) => activity.name)
		// 		return activity.includes(action.payload)
		// 	})	
		// 	return {...state, countries: filterByActivity}

		
		default:
            return {...state}
    }

}

