const mongoose = require('mongoose');

const NutritionLogSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: { type: Date, default: Date.now },        // defualts to todays date
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
    notes: { type: String },                        // optional field for notes
});

const NutritionLog = mongoose.model('NutritionLog', NutritionLogSchema);

module.exports = NutritionLog;