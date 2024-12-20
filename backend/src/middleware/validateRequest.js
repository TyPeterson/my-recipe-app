// validate request bodies against a Joi schema


const Joi = require('joi');

function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details.map(d => d.message) });
    }
    next();
  };
}

module.exports = validateRequest;
