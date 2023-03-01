import {
    GET_ALL_COUNTRIES,

    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
	FILTER_BY_CONTINENT,

	GET_ACTIVITIES,
    POST_ACTIVITIES,

	FILTERED_BY_ACTIVITIES,
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

		case ORDER_BY_NAME:
            const sorted = state.countries
            const isAscending = action.payload === "Ascendente";
            const sortedCountries = sorted.sort((a, b) =>
                isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            )
            return {
                ...state,
                countries: sortedCountries
            }
		
		case ORDER_BY_POPULATION: 
			const orderByPopulation = state.countries
				if (action.payload === "Ascendente") {
					orderByPopulation.sort((a,b) => a.population - b.population)
				} else {
					orderByPopulation.sort((a,b)=> b.population - a.population)
				}
			return {
				...state, 
				countries: orderByPopulation}
		

		case FILTER_BY_CONTINENT: 
			const Countries = 
				action.payload === "All"
					? state.countries
					: state.countries.filter(countries => countries.continent === action.payload);
		return {
			...state,
			countries: Countries
		}
		
		case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
                allActivities: action.payload
            }

        case POST_ACTIVITIES:
            return {
                ...state,
            }

		case FILTERED_BY_ACTIVITIES:
			const allCountries = state.countries;
			const filterActivityBySeason = action.payload === 'All'
				? allCountries
				: allCountries.filter((c) => {
				const activities = c.activities.map((a) => a.season)
				return activities.includes(action.payload)
				})
			return {
				...state,
				countries: filterActivityBySeason,
			};

		default:
            return {...state}
    }

}

