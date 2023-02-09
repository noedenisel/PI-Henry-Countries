const { Router } = require('express');
const { Country } = require ("../db");
const { apiCountries } = require('../controllers/dbCountries');
const server = require('../app');
const { createActivitiesHandler } = require ("../handlers/activitiesHandlers")

const activitiesRouter = Router();

activitiesRouter.post("/", createActivitiesHandler)

module.exports = activitiesRouter