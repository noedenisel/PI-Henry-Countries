const getCountriesHandler = (req, res) => {
    //? llama a la funcion que obtiene los datos de la db
    apiCountries()
    //? cuando tenga los datos, responde
 getCountriesHandler.send("NIY: Mostrando los paises por nombre")
}

const getCountryHandler = (req, res) => {
     res.send("NIY: Mostrando los paises por ID")
}


module.exports = {
    getCountriesHandler,
    getCountryHandler
}