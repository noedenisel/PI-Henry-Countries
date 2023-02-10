const {  Country } = require ("../db")
const { dbCountries } = require("../controllers/dbCountries")

const getCountryById = async (id) => {
    const countryId = await dbCountries.findByPk(id)
    return countryId

}

module.exports = { getCountryById }