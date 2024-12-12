const User = require('../models/User'); // Import User model for profile operations

// Fetch user profile based on profile type
const getProfile = async (req, res) => 
{
  const { userId } = req.params; // Assume userId is passed as param
  
  try 
  {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return full member profile
    res.json(user);
  } catch (error) 
  {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profil
const updateProfile = async (req, res) => 
{
  const { userId } = req.params; // Assume userId is passed as param
  
  try 
  {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update user details w/ data from req.body
    Object.assign(user, req.body)
    await user.save();

    res.json({ message: `${profileType} profile updated successfully`, profile: user[profileType] });
  } catch (error) 
  {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user profile
const deleteProfile = async (req, res) => 
{
  const { userId } = req.params; // Assume userId is passed as param

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = 
{
  deleteProfile, 
  getProfile,
  updateProfile
};