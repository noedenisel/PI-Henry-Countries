const {  Country, Activity } = require ("../db")
const { Op } = require("sequelize");



const getAllCountries = async () => {
    const countries = await Country.findAll({
        include: {
            model: Activity,
            attributes: ["name"]
        }
    })
    return countries
}

  const searchCountryByName = async (name) => {
    const country = await Country.findAll({
        where: {
            name:{
                [Op.iLike]: `%${name}%`
            }
        },
        include: Activity 
    }) 
    return country
 
}



const getCountryById = async (id) => {
    const countryId = await Country.findByPk(id, {
        includes: {
            model: Activity
        }
    })
    return countryId
}

module.exports = { getCountryById , searchCountryByName, getAllCountries
  

}