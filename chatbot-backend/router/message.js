const router = require('express').Router();

const { messages } = require('../controllers/messageController');
const { auth } = require('../middleware/auth');

router.get('/', [
    auth
], messages);

module.exports = router;