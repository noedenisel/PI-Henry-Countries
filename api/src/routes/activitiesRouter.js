const { Router } = require('express');
const { Country } = require ("../db");
const { apiCountries } = require('../controllers/dbCountries');
const server = require('../app');

const activitiesRouter = Router();

activitiesRouter.post("/", (req,res)=>{
   
        res.status(200).send("Crear activity")
   
}
)

module.exports = activitiesRouter