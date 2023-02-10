const {  Country, Activity } = require ("../db")

const getAllCountries = async () => {
    const country = await Country.findAll()
    return country

}

const searchCountryByName = (name) => {


}



const getCountryById = async (id) => {
    const countryId = await Country.findByPk(id, {
        includes: {
            model: Activity
        }
    })
    return countryId

}

module.exports = { getCountryById , getAllCountries , searchCountryByName }