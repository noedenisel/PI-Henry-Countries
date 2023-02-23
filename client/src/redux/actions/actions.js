import  axios from "axios"

import {
    GET_ALL_COUNTRIES,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    FILTER_BY_CONTINENT,
    
    GET_ACTIVITIES,
    POST_ACTIVITIES,
    FILTERED_BY_ACTIVITIES


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

export const orderByName = (order) => {
    return {type: ORDER_BY_NAME, payload: order}
}

export const orderByPopulation = (order) => {
    return {type: ORDER_BY_POPULATION, payload: order}
}

export const filterByContinent = (payload) => {
    return {type: FILTER_BY_CONTINENT, payload: payload}
}


export function postActivity(payload) {
    return async function () {
        try {
            const response = await fetch("http://localhost:3001/activities", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        })
        const apiData = await response.json();
        return {
            type: POST_ACTIVITIES,
            payload: apiData,
        }
        } catch (error) {
        console.error(error);
        throw new Error("La actividad no se pudo crear");
    }
}
}

export const getAllActivities = () => {
    return async function (dispatch) {
      try {
        const response = await fetch("http://localhost:3001/activities")
        const apiData = await response.json()
        const allActivities = apiData;
        dispatch({ type: GET_ACTIVITIES, payload: allActivities })
      } catch (error) {
        console.error(error);
        throw new Error("No se encontraron actividades")
      }
    };
  }
  

export const filterByActivities = (activities) => {
    console.log(activities)
    return { type: FILTERED_BY_ACTIVITIES, payload: activities }
}
