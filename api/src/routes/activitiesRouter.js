const { Router } = require('express');
const { Country } = require ("../db");
const { apiCountries } = require('../controllers/dbCountries');
const server = require('../app');
const { getActivitiesHandler } = require ("../handlers/activitiesHandlers")

const activitiesRouter = Router();

activitiesRouter.post("/activities", getActivitiesHandler)

module.exports = activitiesRouter