const AccessLog = require("../models/AccessLog");
const Policy = require("../models/Policy");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalLogs = await AccessLog.countDocuments();
    const allowedRequests = await AccessLog.countDocuments({ status: "ALLOWED" });
    const deniedRequests = await AccessLog.countDocuments({ status: "DENIED" });
    const totalPolicies = await Policy.countDocuments();
    const totalUsers = await User.countDocuments();

    // Recent 10 logs for activity list
    const recentActivity = await AccessLog.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 })
      .limit(10);

    // Group logs by date for the line chart (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const logsByDate = await AccessLog.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          allowed: { $sum: { $cond: [{ $eq: ["$status", "ALLOWED"] }, 1, 0] } },
          denied: { $sum: { $cond: [{ $eq: ["$status", "DENIED"] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format for recharts
    const chartData = logsByDate.map(day => ({
      date: day._id,
      Allowed: day.allowed,
      Denied: day.denied,
      Total: day.total
    }));

    res.status(200).json({
      stats: {
        totalLogs,
        allowedRequests,
        deniedRequests,
        totalPolicies,
        totalUsers
      },
      recentActivity,
      chartData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
