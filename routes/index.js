const backendRouter = require("./backend/index");
const systemConfig = require("../configs/system");

function route(app) {
  app.locals.systemConfig = systemConfig;
  app.use(`/${systemConfig.prefixAdmin}`, backendRouter);
}

module.exports = route;
