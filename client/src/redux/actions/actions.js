import  axios from "axios"

import {
    GET_ALL_COUNTRIES,
    GET_COUNTRY_BY_NAME,
    GET_COUNTRY_BY_ID,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    GET_ACTIVITIES,
    POST_ACTIVITY,
   
} from "./types"


export const getAllCountries = () => {
    return async function(dispatch) {
        const dbData = await axios.get(
            `http://localhost:3001/countries`
            )
        const getAllCountries = dbData.data
        dispatch({type: GET_ALL_COUNTRIES, payload: getAllCountries})
    }
}

export const getCountryByName = (name) => {
    return async function(dispatch) {
        const dbData = await axios.get(
            `http://localhost:3001/countries?name=${name}`
            )
        const countryByName = dbData.data
        dispatch({type: GET_COUNTRY_BY_NAME, payload: countryByName})
    }
}

export const setSearchName = (name) => {
    return { type: 'SET_SEARCH_NAME',payload: name,};
  } //? creando una acción que actualice el estado de búsqueda. Toma el nombre del país como parámetro
  

export const getCountryById = (id) => {
    return async function(dispatch) {
        const dbData = await axios.get(
            `http://localhost:3001/countries/${id}`
            )
        const countryById = dbData.data
        dispatch({type: GET_COUNTRY_BY_ID, payload: countryById})
    }
}

export const filterByContinent = (payload) => {
    return {type: FILTER_BY_CONTINENT, payload: payload}
}

export const filterByActivity = (activities) => {
    return{type: FILTER_BY_ACTIVITY, payload: activities}
}

export const orderByName = (order) => {
    return {type: ORDER_BY_NAME, payload: order}
}

export const orderByPopulation = (order) => {
    return {type: ORDER_BY_POPULATION, payload: order}
}


export const getActivities = () => {
    return async function(dispatch) {
        const dbData = await axios.get(
            `http://localhost:3001/activities`
            )
        const getActivities = dbData.data
        dispatch({type: GET_ACTIVITIES, payload: getActivities})
    }
}

export function postActivity(payload)  {
    return async function() {
        try {
            const dbData = await axios.post("http://localhost:3001/activities", payload)
            return {type: POST_ACTIVITY, payload: dbData}
        } catch (error){
            throw new Error ("No se pudo crear la actividad")
        }
    }
}

