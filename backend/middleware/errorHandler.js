// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  console.log({ status: errStatus, message: errMsg, stack: err.stack });
  res.status(errStatus).json({
    status: errStatus,
    message: errMsg,
  });
};

module.exports = errorHandler;
