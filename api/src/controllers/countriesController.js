const {  Country, Activity } = require ("../db")
const { Op } = require("sequelize");



const getAllCountries = async () => {
    const countries = await Country.findAll(
        {
        include: {
            model: Activity,
            as: 'activities',
            attributes: ["name", "difficulty", "duration", "season"]
        }
    }
    )
    return countries
}

const searchCountryByName = async (name) => {
         const country = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        include: {
            model: Activity,
            as: 'activities',
            attributes: ["name", "difficulty", "duration", "season"]
        }
    },
    );
    
    return country;
}
    
    
const getCountryById = async (id) => {
    const countryId = await Country.findByPk(id, {
        include: {
            model: Activity,
            as: 'activities',
            attributes: ["name", "difficulty", "duration", "season"]
        }
    
    })
    return countryId
}

module.exports = { getCountryById , getAllCountries, searchCountryByName
  

}