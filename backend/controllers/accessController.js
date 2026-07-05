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

    if (policy && policy.action === "ALLOW") {
      status = "ALLOWED";
    }

    await AccessLog.create({
      userId: req.user.id,
      role,
      resource,
      status,
    });

    if (status === "ALLOWED") {
      return res.status(200).json({
        message: "Access Granted",
      });
    }

    return res.status(403).json({
      message: "Access Denied",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  checkAccess,
};