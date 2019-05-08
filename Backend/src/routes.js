/**
 * ROUTES
 * Structure of CRUD routes:
 *    Create
 *    Read all
 *    Read one
 *    Update
 *    Delete
 */

const express = require("express");

const routes = express.Router();

/**
 * Controllers
 */
const UserController = require("./controllers/UserController");
//const SolarPanelController = require("./controllers/SolarPanelController");
//const WindGeneratorController = require("./controllers/WindGeneratorController");

/**
 * Routes - User - CRUD
 */
routes.post("/user", UserController.create);
routes.get("/user", UserController.read);
routes.get("/user/:id", UserController.read);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);

/**
 * Routes - SolarPanel - CRUD
 */

/**
 * Routes - WindGenerator - CRUD
 */

module.exports = routes;
