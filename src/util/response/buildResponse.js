const buildResponse = (data, errorMessage) => {
  return {
    error: errorMessage ?? null,
    data,
  };
};

module.exports = {
  buildResponse,
};
