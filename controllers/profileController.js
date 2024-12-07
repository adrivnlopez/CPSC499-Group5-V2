const User = require('../models/User'); // Import User model for profile operations

// Fetch user profile based on profile type
const getProfile = async (req, res) => 
{
  const { userId, profileType } = req.params; // Assume userId and profileType are passed as params
  
  try 
  {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return the requested profile type
    const profile = user[profileType]; // Access specific profile type (Gym, School, etc.)
    res.json(profile);
  } catch (error) 
  {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile based on profile type
const updateProfile = async (req, res) => 
{
  const { userId, profileType } = req.params; // Assume userId and profileType are passed as params
  
  try 
  {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update the specified profile type
    user[profileType] = req.body; // Update profile with data from request body
    await user.save();

    res.json({ message: `${profileType} profile updated successfully`, profile: user[profileType] });
  } catch (error) 
  {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = 
{
  getProfile,
  updateProfile
};