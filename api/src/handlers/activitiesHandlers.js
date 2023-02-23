const { createActivity } = require('../controllers/activityControllers');
const { Activity } = require('../db');

const activitiesHandlers = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countryId } = req.body
    const newActivity = await createActivity(name, difficulty, duration, season, countryId);
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllActivities = async (req, res) => {
  try {
    const allActivities = await Activity.findAll()
    return res.status(200).json(allActivities)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

module.exports = {
  activitiesHandlers,
  getAllActivities,
}
