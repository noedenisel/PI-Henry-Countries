const { Router } = require('express');
const { Country } = require ("../db");
const { apiCountries } = require('../controllers/dbCountries');
const { getCountriesHandler, getCountryHandler} = require ("../handlers/countriesHandlers")


const countriesRouter = Router();


countriesRouter.get("/countries",  getCountriesHandler)

countriesRouter.get("/countries/:id", getCountryHandler )


module.exports = countriesRouter