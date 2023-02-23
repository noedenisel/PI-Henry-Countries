const { Activity, Country } = require('../db');

const createActivity = async (name, difficulty, duration, season, countryId) => {
  try {
    const newActivity = await Activity.findOrCreate({
      where: { name },
      defaults: { difficulty, duration, season }
    })
    
    const countries = await Country.findAll({ 
      where: 
      { id: 
        countryId } 
      })
    if (countries.length !== countryId.length) {
      throw new Error('Algunos de los países proporcionados no existen')
    }
    
    await newActivity[0].addCountries(countries)
    return newActivity[0]
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createActivity };


