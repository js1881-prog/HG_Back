const express = require("express");
const searchController = require("../search/searchController");
const userRouter = express.Router();

userRouter.get("/", searchController.getSearch);

module.exports = userRouter;
