const { Router } = require('express');
const { activitiesHandlers, getAllActivities } = require('../handlers/activitiesHandlers');


const activitiesRouter = Router();
const validate = (req, res, next) => {
    const {name, difficulty, duration, season} = req.body;
    if (![name, difficulty, duration, season].every(Boolean))
    return res.status(400).json({error: 'Todos los campos son requeridos'})

    next()
}

activitiesRouter.post('/', validate, activitiesHandlers);
activitiesRouter.get('/', getAllActivities)


module.exports = activitiesRouter