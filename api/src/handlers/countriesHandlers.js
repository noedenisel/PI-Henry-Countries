const { apiCountries } = require ("../controllers/dbCountries")
const { getCountryById  } = require ("../controllers/countriesController")
const { dbCountries } = require ("../controllers/dbCountries")



const getCountriesHandler = (req, res) => {
    const { name } = req.query

    //? llama a la funcion que obtiene los datos de la db
    apiCountries() //!ojo cuando hago el get tira error en consola
    
    
    //? cuando tenga los datos, responde
    if(name !== undefined) res.send(`Quiero buescar todos los que se llamen ${name}`)
    
    else res.send("Quiero mostrar todos los paises")
}



const getCountryHandler = async (req, res) => {
    const { id } = req.params
    // if (typeof String(id) == "string") console.log("es un string");


    
    try{
        const countryId = await getCountryById(id)
        if(countryId) return res.status(200).json (countryId)
        else return res.status(400).json(`No hay paises con el Id: ${id}`)
        // res.status(200).json("ok")
     
    } catch (error) {
        res.status(400).json({error: error.message})
    }
      
}


module.exports = {
    getCountriesHandler,
    getCountryHandler
}