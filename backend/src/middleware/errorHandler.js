// global error handling middleware


function errorHandler(err, req, res, next) {
    console.error(err); // Log the error for debugging
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
  
  module.exports = errorHandler;
  