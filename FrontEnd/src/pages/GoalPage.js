import React, { useState, useEffect } from 'react';
import './goalpage.css';  // Import the CSS file

function GoalPage() {
    const [goals, setGoals] = useState([]);
    const [logs, setLogs] = useState([]);
    const [showGoals, setShowGoals] = useState(false);  // New state to toggle goals visibility

    // Goal Type Mapping
    const goalTypeMapping = {
        "weightLoss": "Weight Loss/Gain",
        "muscleGain": "Muscle Gain",
        "endurance": "Endurance Improvement"
    };

    // Load goals and daily logs from localStorage
    useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const savedLogs = JSON.parse(localStorage.getItem('dailyLogs')) || [];
        setGoals(savedGoals);
        setLogs(savedLogs);
    }, []);

    // Event: Add Goal
    const handleGoalSubmit = (e) => {
        e.preventDefault();
        const goalType = e.target['goal-type'].value;
        const goalDescription = e.target['goal-description'].value;
        const goalDeadline = e.target['goal-deadline'].value;

        const newGoal = {
            type: goalType,
            description: goalDescription,
            deadline: goalDeadline,
        };

        const updatedGoals = [...goals, newGoal];
        setGoals(updatedGoals);
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
        alert(`Goal Added: ${goalTypeMapping[goalType]} - "${goalDescription}" by ${goalDeadline}`);
    };

    // Event: Add Daily Tracker Input
    const handleTrackerSubmit = (e) => {
        e.preventDefault();

        const runMinutes = e.target['runTimeMinutes'].value || 0;
        const runSeconds = e.target['runTimeSeconds'].value || 0;
        const runTime = `${runMinutes} mins ${runSeconds} secs`;

        const weightChange = e.target['weight_change'].value || 0;
        const weightUnit = e.target['weight_unit'].value;
        const weightText = `${weightChange} ${weightUnit}`;

        const muscleChange = e.target['muscle_change'].value || 0;
        const muscleUnit = e.target['muscle_unit'].value;
        const muscleText = `${muscleChange} ${muscleUnit}`;

        const currentDate = new Date().toLocaleDateString();
        const logText = `[${currentDate}] Run Time: ${runTime}, Weight Change: ${weightText}, Muscle Change: ${muscleText}`;

        const updatedLogs = [...logs, logText];
        setLogs(updatedLogs);
        localStorage.setItem('dailyLogs', JSON.stringify(updatedLogs));
    };

    return (
        <div>
            <header>
                <h1>Fitness Goal Tracker</h1>
                <nav>
                    <button className="nav-button">Home</button>
                    <button className="nav-button">User Profile</button>
                    <button className="nav-button">Workout Plans</button>
                    <button className="nav-button">Nutrition Tracking</button>
                </nav>
            </header>

            <main>
                {/* Goal Setting */}
                <section id="goalSetting">
                    <h2>Set Your Fitness Goals</h2>
                    <form id="goal-form" onSubmit={handleGoalSubmit}>
                        <label htmlFor="goal-type">Goal Type:</label>
                        <select id="goal-type" required>
                            <option value="weightLoss">Weight Loss/Gain</option>
                            <option value="muscleGain">Muscle Gain</option>
                            <option value="endurance">Endurance Improvement</option>
                        </select>

                        <label htmlFor="goal-description">Description:</label>
                        <textarea id="goal-description" rows="3" placeholder="Describe your goal here" required></textarea>

                        <label htmlFor="goal-deadline">Deadline:</label>
                        <input type="date" id="goal-deadline" required />

                        <button type="submit">Add Goal</button>
                    </form>
                    <button id="view-goals-button" onClick={() => setShowGoals(!showGoals)}>
                        {showGoals ? "Hide Goals" : "View Goals"}
                    </button>
                    {showGoals && (
                        <ul id="goal-list">
                            {goals.map((goal, index) => (
                                <li key={index}>
                                    {`${index + 1}. Type: ${goalTypeMapping[goal.type] || goal.type}, Description: "${goal.description}", Deadline: ${goal.deadline}`}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Daily Tracker */}
                <section id="daily-tracker">
                    <h2>Daily Tracker</h2>
                    <form id="tracker-form" onSubmit={handleTrackerSubmit}>
                        <label htmlFor="runTimeMinutes">Run Time:</label>
                        <div>
                            <input type="number" id="runTimeMinutes" placeholder="Minutes" min="0" />
                            <input type="number" id="runTimeSeconds" placeholder="Seconds" min="0" max="59" />
                        </div>

                        <label htmlFor="weight_change">Weight Change:</label>
                        <input type="number" id="weight_change" placeholder="Example: -1 (kg)" step="0.1" />
                        <select id="weight_unit">
                            <option value="kg">Kilograms</option>
                            <option value="lbs">Pounds</option>
                        </select>

                        <label htmlFor="muscle_change">Muscle Change:</label>
                        <input type="number" id="muscle_change" placeholder="Example: 0.5 (lbs)" step="0.1" />
                        <select id="muscle_unit">
                            <option value="kg">Kilograms</option>
                            <option value="lbs">Pounds</option>
                        </select>

                        <button type="submit">Save Daily Input</button>
                    </form>

                    <div id="dailyLogs">
                        <h3>Daily Logs:</h3>
                        <ul id="logList">
                            {logs.map((log, index) => (
                                <li key={index}>{log}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default GoalPage;
