const { Router } = require('express');
const axios = require('axios');
const { Country } = require ("../db");
const { apiCountries } = require('../controllers/dbCountries');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req,res)=>{
    apiCountries()
   try {
    res.status(200).send("estoy en countries")
   } catch (error) {
    res.status(400).json({error: error.message})
    }
})

router.get("/:id", (req,res)=>{
    const {} = req.query
    try{
        res.status(200).send("Estoy en id")
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
)

router.post("/activities", (req,res)=>{
    const {} = req.body
    try{
        res.status(200).send("Estoy en activities")
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
)


module.exports = router;
