const {  Country } = require ("../db")
const { dbCountries } = require("../controllers/dbCountries")

const getCountryById =  async (id) => {
    const countryId = await Country.findByPk(id)
    return countryId

}

module.exports = { getCountryById }