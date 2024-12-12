const Goal = require('../models/GoalTracking');

// Fetch all goals for a user
const getGoals = async (req, res) => {
    const { userId } = req.params; // Assume userId is passed as param

    try {
        const goals = await Goal.findById({ userId });
        if (!goals || goals.length === 0) return res.status(404).json({ message: 'No goals found' });

        // return all goals for user
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// create a new goal for the user
const createGoal = async (req, res) => {
    const { userId } = req.params; 
    const goalData = req.body; // goal details from request body

    try {
        const goal = new Goal({ ...goalData, userId });
        await goal.save(); 

        res.status(201).json({ message: 'Goal uccesfully created', goal })
    } catch(error) {
        res.status(400).json({ message: 'Something went wrong', error: error.message });
    }
};

// update an existing goal
const updateGoal = async (req, res) => {
    const { goalId } = req.params; // assume goalId is passed as params
    const updates = req.body; // updates to the goal from request body

    try {
        const updatedGoal = await Goal.findByIdAndUpdate(goalId, updates, { new: true });
        if(!updatedGoal) return res.status(404).json({ message: 'Goal not found' });

        // add goal to user goals
        res.json({ message: 'Goal updated!', goal: updatedGoal });
    } catch (error) {
        res.status(400).json({ message: "Failed to update goal", error: error.message });
    }
};

// delete a goal
const deleteGoal = async (req, res) => {
    const { goalId } = req.params; // assume goalId is passed as params

    try {
        const goalDeleted = await Goal.findByIdAndDelete(goalId);
        if (!goalDeleted) return res.status(404).json({ message: 'Goal could not be deleted' });

        res.json({ message: "Goal deleted"});
    } catch (error) {
        res.status(500).json({ message: "error" });
    }
};

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
};
