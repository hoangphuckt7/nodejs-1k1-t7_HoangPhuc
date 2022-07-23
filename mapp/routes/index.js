const backendRouter = require("./backend/index");
const frontendRouter = require("./frontend/index");
const systemConfig = require("../configs/system");

function route(app) {
  app.locals.systemConfig = systemConfig;
  app.use(`/${systemConfig.prefixAdmin}`, backendRouter);
  app.use(`/${systemConfig.prefixBlog}`, frontendRouter);
}

module.exports = route;
