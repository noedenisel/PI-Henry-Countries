const { Activity } = require ("../db")

const createActivity = async (name, difficulty, duration, season, countryId ) => {
    const newActivity = await Activity.create (
        { 
            name, 
            difficulty, 
            duration, 
            season, 
            
        }
    )
    return newActivity
}

module.exports = { createActivity }