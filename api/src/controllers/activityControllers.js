const { Activity, Country } = require('../db');


// const createActivity = async (name, difficulty, duration, season, countryId) => {
//     const newActivity = await Activity.findOrCreate({  
//         where: {name}, // ? busco por name y devuelvo el resto de las propiedades por default.
//         defaults: {difficulty, duration, season}
//     })
//     const country = await Country.findByPk(countryId); // ? busco el country y hago una mini validación previa.
//     if (!country) {
//         throw new Error(`No se encontró un país con ID ${countryId}`)
//     }
//     await newActivity[0].addCountry(countryId) //? para agregar el country en la nueva actividad, hay fijarla en [0] el findOrCreate devuelve un objeto con bastante más data
  
//     return newActivity
// }





const createActivity = async (name, difficulty, duration, season, countryIds) => {
    const newActivity = await Activity.findOrCreate({
        where: { name },
        defaults: { difficulty, duration, season }
    });

    const countries = await Country.findAll({ // ? usp findAll en lugar de findByPk para buscar los países por sus IDs y valido q todos los países proporcionados existan en la base de datos antes de vincularlos a la actividad
        where: { id: countryIds }
    });

    if (countries.length !== countryIds.length) { //? compara el array de resultados con el array countryIds xa ver si encontre con el findAll a todos los paises
        
        throw new Error('Algunos de los países proporcionados no existen');
    }

    await newActivity[0].addCountries(countries); //? en lugar de pasar un solo ID de país a addCountry, paso el array de objetos countries devuelto por findAll a addCountries

    return newActivity;
};

module.exports = { createActivity };