const Policy = require("../models/Policy");

const createPolicy = async (req, res) => {
  try {
    const policy = await Policy.create(req.body);

    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPolicy,
};