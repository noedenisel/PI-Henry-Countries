const { Country } = require("../db")
const axios = require ("axios")

const apiCountries = async () => {
        const apiDB = await Country.findAll()
        if (apiDB.length) return apiDB //? di tengo algo, no hago nada

        let apiResponse = await axios.get("https://restcountries.com/v3/all") // ? solicita los datos a la api externa
        const allCountries = await apiResponse.data.map(country => ({ //? trae los datos unificando el formato
            id: country.cca3, 
            name: country.name.common,
            flag: country.flags[1],
            capital: country.capital ? country.capital[0] : "Este paìs no tiene una capital",
            continent: country.region,
            subregion: country.subregion,
            area: country.area || null, 
            population: country.population || null
        }))

        apiInformation = await Country.bulkCreate(allCountries) //? guardo los datos con el formato unificado en mi db
        return await Country.findAll()
   
}

module.exports = {apiCountries}