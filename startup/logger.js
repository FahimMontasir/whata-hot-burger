module.exports = function () {
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
