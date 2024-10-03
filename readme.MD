# Gym Application

## Overview

This project is a comprehensive gym membership management application. It allows for the creation, retrieval, and management of gym members, nutrition tracking, and workout plans (sets and reps). The application uses phone numbers as the unique identifier for members and provides functions to manage both active and inactive members. Additionally, it features tools to help members track their nutrition and log their workout routines, including sets and reps.

## Features

### Membership Management

- **Create New Members**: Add new gym members to the database using their details.
- **Retrieve Member by Phone Number**: Fetch member details using their phone number.
- **Update Member Information**: Modify a member's information by searching with their phone number.
- **Manage Active/Inactive Members**: Retrieve lists of active or inactive members and mark members as inactive.

### Nutrition Management

- **Track Daily Nutrition**: Members can log their daily meals, calories, and macronutrients (proteins, fats, carbs).
- **View Nutrition History**: Members can view a history of their nutrition logs to track their diet over time.
- **Set Nutrition Goals**: Members can set specific nutrition goals, such as calorie intake or macronutrient ratios, to better manage their fitness goals.

### Workout Plan (Sets and Reps)

- **Log Sets and Reps**: Members can log their workout routines, including exercises, sets, and reps.
- **Track Workout Progress**: Members can view their progress over time for specific exercises.
- **Create Custom Workouts**: Members can create and save custom workout routines, combining exercises with specified sets and reps for each session.

## Technologies Used

- **Node.js**: JavaScript runtime used for building the backend services.
- **MongoDB**: Database used to store member, nutrition, and workout data.
- **Mongoose**: ODM library used to interact with MongoDB.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adrivnlopez/CPSC499-Group5-V2.git
   ```
