const { Router } = require('express');
const server = require('../app');
const { createActivitiesHandler } = require ("../handlers/activitiesHandlers")

const activitiesRouter = Router();

activitiesRouter.post("/", createActivitiesHandler)

module.exports = activitiesRouter