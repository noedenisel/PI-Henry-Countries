const { createActivity } = require ("../controllers/activityControllers")

const createActivitiesHandler = async (req, res) => {
    const { name, difficulty, duration, season, countryId } = req.body
    
    try {
        
        const newActivity = await createActivity(name, difficulty, duration, season, countryId)
        res.status(200).json(newActivity)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
    // res.send(`NIY: creando una actividad con los siguientes datos:
    //     name : ${name},
    //     difficulty : ${difficulty},
    //     duration : ${duration} horas,
    //     season : ${season} 
    // `)
}


module.exports = {
    createActivitiesHandler,

}