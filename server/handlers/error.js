function errorHandler(error, request, response) {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || 'something went wrong',
    },
  });
}

module.exports = errorHandler;
