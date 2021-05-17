const router = require('express').Router();

const { login, register } = require('../controllers/authController');
const { validate } = require('../validators');
const { rules: registrationRules } = require('../validators/rules/auth/register');
const { rules: loginRules } = require('../validators/rules/auth/login');

router.post('/register', [
    registrationRules,
    validate,
], register);

router.post('/login', [
    loginRules,
    validate
], login);

module.exports = router;