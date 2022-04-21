const routes = require('express').Router();
const buyerRouter = require("./buyerRoutes")
const sellerRouter = require("./sellerRoutes");

routes.use("/", buyerRouter);
// routes.use("/seller", sellerRouter);

module.exports = routes;