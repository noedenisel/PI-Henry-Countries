const { Country } = require("../db")
const axios = require ("axios")

const apiCountries = async () => {
    try { 
        const apiDB = await Country.findAll()
        if (apiDB.length) return apiDB //? di tengo algo, no hago nada

        const apiInformation = await axios.get("https://restcountries.com/v3/all") // ? solicita los datos a la api externa
        const allCountries = await apiInformation.data.map(country => ({ //? trae los datos unificando el formato
            id: country.cca3, 
            name: country.name.common,
            flag: country.flag[0],
            capital: country.capital ? country.capital[0] : "Este paìs no tiene una capital",
            continent: country.region,
            subregion: country.subregion,
            area: country.area || null, 
            population: country.population || null
        }))

        apiInformation = await Country.bulkCreate(allCountries) //? guardo los datos con el formato unificado en mi db
        return apiInformation
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {apiCountries}