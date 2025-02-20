const User = require("../models/User.js");

// Function to handle button click
const handleButtonClick = async (req, res) => {
  const { userId } = req.body; // Get userId from request
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
    }

    user.totalClicks += 1;

    const randomChance = Math.random();
    if (randomChance < 0.5) {
      user.totalPoints += 10; // 50% chance of getting 10 points
    } else if (randomChance < 0.75) {
      user.prizesWon += 1; // 25% chance of winning a prize
    }

    await user.save();
    res.json({ totalClicks: user.totalClicks, totalPoints: user.totalPoints, prizesWon: user.prizesWon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to fetch user data
const fetchUserData = async (req, res) => {
  const { userId } = req.query; // Get userId from request
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
      await user.save();
    }

    res.json({ totalClicks: user.totalClicks, totalPoints: user.totalPoints, prizesWon: user.prizesWon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports={
    handleButtonClick,
    fetchUserData  
}