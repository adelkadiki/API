const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);
router.route('/reset').get(authMiddleware.forgotPassword); // Patch since the password will be updated

module.exports = router;