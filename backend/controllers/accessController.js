const Policy = require("../models/Policy");
const AccessLog = require("../models/AccessLog");

const checkAccess = async (req, res) => {
  try {
    const { resource } = req.body;
    const role = req.user.role;

    const policy = await Policy.findOne({
      role,
      resource,
    });

    let status = "DENIED";
    let reason = "No matching ALLOW policy found for this role and resource.";

    if (policy && policy.action === "ALLOW") {
      status = "ALLOWED";
      reason = "Matched an active ALLOW policy.";
    } else if (policy && policy.action === "DENY") {
      reason = "Explicit DENY policy matched.";
    }

    const log = await AccessLog.create({
      userId: req.user.id,
      role,
      resource,
      status,
    });

    return res.status(status === "ALLOWED" ? 200 : 403).json({
      message: status === "ALLOWED" ? "Access Granted" : "Access Denied",
      matchedPolicy: policy || null,
      timestamp: log.createdAt,
      reason
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLogs = async (req, res) => {
  try {
    const { status, role, resource, date, page = 1, limit = 10, sort = 'desc' } = req.query;
    let query = {};
    if (status) query.status = status;
    if (role) query.role = role;
    if (resource) query.resource = { $regex: resource, $options: "i" };
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const sortOrder = sort === 'asc' ? 1 : -1;

    const logs = await AccessLog.find(query)
      .populate("userId", "username email")
      .sort({ createdAt: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await AccessLog.countDocuments(query);

    res.status(200).json({
      logs,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkAccess,
  getLogs,
};