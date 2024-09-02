const express = require('express');
const userRoute = require('./userRoute');
const taskRoute = require('./taskRoute');

const router = express.Router();

router.use('/user', userRoute); // this is the route for users
router.use('/task', taskRoute); // this is the route for tasks



module.exports = router;
