const { Router } = require('express');
const { Country } = require ("../db");
const { apiCountries } = require('../controllers/dbCountries');

const countriesRouter = Router();

countriesRouter.get("/", async (req,res)=>{
   
    res.send("NIY: Mostrando los paises por nombre")
   
})


countriesRouter.get("/:id", async (req,res)=>{
    res.send("NIY: Mostrando los paises por ID")
}
)

module.exports = countriesRouter