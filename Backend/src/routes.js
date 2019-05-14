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
const SolarPanelController = require("./controllers/SolarPanelController");
const WindGeneratorController = require("./controllers/WindGeneratorController");
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
 * Routes - SolarPanel - CRUD
 */
routes.post("/solarpanel", SolarPanelController.create);
routes.get("/solarpanel", SolarPanelController.read);
routes.get("/solarpanel/:id", SolarPanelController.read);
routes.put("/solarpanel/:id", SolarPanelController.update);
routes.delete("/solarpanel/:id", SolarPanelController.delete);

/**
 * Routes - WindGenerator - CRUD
 */
routes.post("/windgenerator", WindGeneratorController.create);
routes.get("/windgenerator", WindGeneratorController.read);
routes.get("/windgenerator/:id", WindGeneratorController.read);
routes.put("/windgenerator/:id", WindGeneratorController.update);
routes.delete("/windgenerator/:id", WindGeneratorController.delete);

/**
 * Routes - Log - CR only
 */
routes.post("/log", LogController.create);
routes.get("/log", LogController.read);
routes.get("/log/:id", LogController.read);

module.exports = routes;
