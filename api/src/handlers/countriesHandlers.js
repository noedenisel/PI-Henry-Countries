const { apiCountries } = require ("../controllers/dbCountries")
const { getCountryById , getAllCountries } = require ("../controllers/countriesController")
const Country = require("../models/Country")




const getCountriesHandler = async (req, res) => {
    const { name } = req.query

    //? llama a la funcion que obtiene los datos de la db
    apiCountries() 

    try {
        
        const countries = await getAllCountries()
        return res.status(200).send(countries)
    }  catch(error){
        res.status(400).json({error: error.message})
    }
}



const getCountryHandler = async (req, res) => {
    const { id } = req.params
    
    try{
        const countryId = await getCountryById(id)
        if(countryId) return res.status(200).json (countryId)
        else return res.status(400).json(`No hay paises con el Id: ${id}`)
   
     
    } catch (error) {
        res.status(400).json({error: error.message})
    }
      
}


module.exports = {
    getCountriesHandler,
    getCountryHandler
}