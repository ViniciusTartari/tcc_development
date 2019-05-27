/**
 * ROUTES
 * Default structure of CRUD routes:
 *    Create
 *    Read
 *    Update
 *    Delete
 */

const express = require("express");

const routes = express.Router();

/**
 * Controllers
 */
const UserController = require("./controllers/UserController");
const GenerationUnitController = require("./controllers/GenerationUnitController");
const LogController = require("./controllers/LogController");

/**
 * Routes - User - CRUD
 */
routes.post("/user", UserController.create);
routes.get("/user", UserController.read);
routes.get("/user/:id", UserController.read);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);

/**
 * Routes - GenerationUnit - CRUD
 */
routes.post("/generationunit", GenerationUnitController.create);
routes.get("/generationunit", GenerationUnitController.read);
routes.get("/generationunit/:id", GenerationUnitController.read);
routes.put("/generationunit/:id", GenerationUnitController.update);
routes.delete("/generationunit/:id", GenerationUnitController.delete);

/**
 * Routes - Log - CR only
 */
routes.post("/log", LogController.create);
routes.get("/log", LogController.read);
routes.get("/log/:id", LogController.read);

module.exports = routes;
