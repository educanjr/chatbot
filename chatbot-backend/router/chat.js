const router = require('express').Router();

const { chats, create, remove } = require('../controllers/chatController');
const { auth } = require('../middleware/auth');

router.get('/', [
    auth
], chats);

router.post('/', [
    auth
], create);

router.delete('/:id', [
    auth
], remove);

module.exports = router;