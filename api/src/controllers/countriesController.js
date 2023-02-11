const {  Country, Activity } = require ("../db")



const getAllCountries = async () => {
    const countries = await Country.findAll()
    return countries
}

//  const searchCountryByName = async (name) => {
 
//     if (name) {
//       const country = await Country.findOne({
//         where: {
//           name: {
//             [Sequelize.Op.iLike]: `%${name}%`
//           }
//         }
//       }) 
//       return country
//     } 
 //}



const getCountryById = async (id) => {
    const countryId = await Country.findByPk(id, {
        includes: {
            model: Activity
        }
    })
    return countryId
}

module.exports = { getCountryById , 
  getAllCountries , 

}