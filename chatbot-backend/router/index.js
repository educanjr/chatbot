const router = require('express').Router();

router.get('/home', (req, res) => {
    return res.send('Home screen');
});

router.use('/', require('./auth'));
router.use('/chats', require('./chat'));
router.use('/messages', require('./message'));

module.exports = router;