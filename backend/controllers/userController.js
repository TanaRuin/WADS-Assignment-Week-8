import {User} from '../models/User.js';

// Get current user's profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'name']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user name
const updateProfile = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name;
    await user.save();

    res.status(200).json({ message: 'Profile updated', name: user.name });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout function
const logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/', httpOnly: true, expires: new Date(0) });
        res.json({ message: "Logged out successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export { getProfile, updateProfile, logout };
