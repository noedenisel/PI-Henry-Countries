const { Country } = require("../db")
const axios = require ("axios")

const apiCountries = async () => {
    try { 
        const apiDB = await Country.findAll()
        if (apiDB.length) return apiDB

        const apiInformation = await axios.get("https://restcountries.com/v3/all")
        const allCountries = await apiInformation.data.map(country => ({
            id: country.cca3,
            name: country.name.common,
            flag: country.flag[0],
            capital: country.capital ? country.capital[0] : "Este paìs no tiene una capital",
            continent: country.region,
            subregion: country.subregion,
            area: country.area || null, 
            population: country.population || null
        }))

        apiInformation = await Country.bulkCreate(allCountries)
        return apiInformation
    } catch (error) {
        throw new Error (error.message)
    }
}

module.exports = {apiCountries}