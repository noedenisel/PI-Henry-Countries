const {  Activity, Country } = require('../db')

const createActivity = async (name, difficulty, duration, season, countryId) => {
    const newActivity = await Activity.findOrCreate({  
        where: {name}, //? busco por name y devuelvo el resto de las propiedades por default.
        defaults: {difficulty, duration, season}
    })
    const country = await Country.findByPk(countryId) //? busco el country y hago una mini validación previa.
    if (!country) {
        throw new Error(`No se encontró un país con ID ${countryId}`) //? si no existe, devuelvo que no se encontró el country.
    }
   
    await newActivity[0].addCountry(countryId) //? para agregar el country en la nueva actividad, debo fijarla en [0]xq  el findOrCreate devuelve un objeto con bastante más data
    
    return newActivity; 
}
module.exports = { createActivity }