const express = require('express');
const { protectedRoute, isAdminRoute } = require('../middlewares/authHandler');
const { createTask, getTasks, getTask, duplicateTask, TaskActivity, 
    dashboard, createSubTask, updateTask, trashTask, deleteRestoreTask} = require('../controllers/taskController');

const router = express.Router();

// POST ROUTES
router.post("/create", protectedRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", protectedRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectedRoute, isAdminRoute, TaskActivity);

// GET ROUTES
router.get("/dashboard", protectedRoute,  dashboard);
router.get("/", protectedRoute, getTasks);
router.get("/:id", protectedRoute, getTask);

// PUT ROUTES
router.put("/create-subTask/:id", protectedRoute, isAdminRoute,  createSubTask);
router.put("/update/:id", protectedRoute, isAdminRoute,  updateTask);
router.put("/:id", protectedRoute, isAdminRoute,  trashTask);


// DELETE ROUTES
router.delete("/delete-restore/:id?", protectedRoute, isAdminRoute,  deleteRestoreTask);

module.exports = router;
