const NutritionLog = require('../models/NutritionLog');

// Create a new nutrition log for user
const createNutritionLog = async (req, res) => {
  const { userId } = req.params;                                // User ID from route params
  const { calories, protein, carbs, fat, notes } = req.body;    // Nutrition data from request body

  try {
    const log = await NutritionLog.create({
      user: userId,
      calories,
      protein,
      carbs,
      fat,
      notes,
    });

    res.status(201).json({ message: 'Nutrition log created successfully', log });
  } catch (error) {
    res.status(500).json({ message: 'Error creating nutrition log', error });
  }
};

// get all nutrition logs for a user
const getNutritionLogs = async (req, res) => {
  const { userId } = req.params;

  try {
    const logs = await NutritionLog.find({ user: userId }).sort({ date: -1 });  // sort by date
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving nutrition logs', error });
  }
};

// update a specific nutrition log
const updateNutritionLog = async (req, res) => {
  const { logId } = req.params;
  const { calories, protein, carbs, fat, notes } = req.body;

  try {
    const log = await NutritionLog.findById(logId);
    if (!log) return res.status(404).json({ message: 'Nutrition log not found' });

    log.calories = calories ?? log.calories;
    log.protein = protein ?? log.protein;
    log.carbs = carbs ?? log.carbs;
    log.fat = fat ?? log.fat;
    log.notes = notes ?? log.notes;
    await log.save();

    res.json({ message: 'Nutrition log updated successfully', log });
  } catch (error) {
    res.status(500).json({ message: 'Error updating nutrition log', error });
  }
};

// Delete a specific nutrition log
const deleteNutritionLog = async (req, res) => {
  const { logId } = req.params;

  try {
    const log = await NutritionLog.findByIdAndDelete(logId);
    if (!log) return res.status(404).json({ message: 'Nutrition log not found' });

    res.json({ message: 'Nutrition log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting nutrition log', error });
  }
};

module.exports = {
  createNutritionLog,
  getNutritionLogs,
  updateNutritionLog,
  deleteNutritionLog,
};
