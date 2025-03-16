const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');

// Apply route groups
router.use('/users', userRoutes);

module.exports = router;
