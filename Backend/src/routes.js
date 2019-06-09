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
const GUController = require("./controllers/GenerationUnitController");
const LogController = require("./controllers/LogController");
const SRController = require("./controllers/SINRequestController");

/**
 * Optimizer
 */
const Optimizer = require("./optimizer");

/**
 * User
 */
// Create
routes.post("/user", UserController.create);
// Read without params
routes.get("/user", UserController.read);
// Read with params
routes.get("/user/:id", UserController.read);
// Update
routes.put("/user/:id", UserController.update);
// Delete
routes.delete("/user/:id", UserController.delete);

/**
 * GenerationUnit
 */
// Create
routes.post("/generationunit", GUController.create);
// Read without params
routes.get("/generationunit", GUController.read);
// Read with params
routes.get("/generationunit/:id", GUController.read);
// Update
routes.put("/generationunit/:id", GUController.update);
// Delete
routes.delete("/generationunit/:id", GUController.delete);
// Get by name
routes.get("/generationunit/name/:name", GUController.getByName);
// Get by model
routes.get("/generationunit/model/:model", GUController.getByModel);
// Get by microgrid
routes.get("/generationunit/microgrid/:microgrid", GUController.getByMicrogrid);
// Get GU actives
routes.get("/generationunit/active/:status", GUController.actives);
// Get GU availables
routes.get("/generationunit/available/:status", GUController.availables);

/**
 * SINRequests
 */
// Create
routes.post("/sinrequest", SRController.create);
// Read without params
routes.get("/sinrequest", SRController.read);
// Read with params
routes.get("/sinrequest/:id", SRController.read);
// Update
routes.put("/sinrequest/:id", SRController.update);
// Delete
routes.delete("/sinrequest/:id", SRController.delete);

/**
 * Log
 */
// Create
routes.post("/log", LogController.create);
// Read without params
routes.get("/log", LogController.read);
// Read with params
routes.get("/log/:id", LogController.read);
// Get by type
routes.get("/log/type/:type", LogController.getByType);
// Get by generation unit name
routes.get("/log/guname/:guName", LogController.getByGU);

module.exports = routes;
