const express = require('express');
const { protectedRoute, isAdminRoute } = require('../middlewares/authHandler');
const { registerUser, loginUser, logoutUser, 
        getTeamList, getNotifyList , updateUserProfile, 
        markNotifyAsRead,
        changePassword,
        activateUserProfile,
        deleteUserProfile} = require('../controllers/userController');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectedRoute, isAdminRoute, getTeamList);
router.get("/notify", protectedRoute, getNotifyList);

// PUT/UPDATE REQUEST
router.put("/profile", protectedRoute, updateUserProfile);
router.put("/read-notify", protectedRoute, markNotifyAsRead);
router.put("/change-password", protectedRoute, changePassword);

// // ADMIN ROUTES - ADMIN ONLY
router
.route("/:id")
.put(protectedRoute, isAdminRoute, activateUserProfile)
.delete(protectedRoute, isAdminRoute, deleteUserProfile);

module.exports = router;