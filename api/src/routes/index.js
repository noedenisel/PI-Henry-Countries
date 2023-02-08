const { Router } = require('express');
const axios = require('axios');
const { Country } = require ("../db")
const {dbCountries} = require("../routes/dbCountries")





// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);






// axios.get('https://restcountries.com/v3.1/all')
//   .then(response => {
//     const countries = response.data;
    
//     countries.forEach(async country => {
//       const { id, name, flag, continents, subregion, area, population } = country;

  
//       await Country.create({
//         id: nameCountry.substring(0,3),
//         name: name.common,
//         flag,
//         continents:  country.continents[0],
//         subregion,
//         area,
//         population
//       });
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });


 

module.exports = router;
