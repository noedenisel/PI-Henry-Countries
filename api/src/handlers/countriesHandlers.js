const { apiCountries } = require ("../controllers/dbCountries")

const getCountriesHandler = (req, res) => {
    const { name } = req.query
    
    //? llama a la funcion que obtiene los datos de la db
    apiCountries() //!ojo cuando hago el get tira error en consola
    
    
    //? cuando tenga los datos, responde
    if(name !== undefined) res.send(`Quiero buescar todos los que se llamen ${name}`)
    
    else res.send("Quiero mostrar todos los paises")
}



const getCountryHandler = (req, res) => {
    const { id } = req.params
    res.send(`detalle del pais del ID ${id}`)
}


module.exports = {
    getCountriesHandler,
    getCountryHandler
}