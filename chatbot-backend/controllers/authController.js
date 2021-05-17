const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models').User;
const config = require('../config/app');

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if(!user) return res.status(404).json({message: 'User not found!'});

        if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: 'Password do not match!'});

        const userWithToken = generateToken(user.get({raw: true}));
        userWithToken.user.avatar = user.avatar;

        return res.send(userWithToken);
    } catch(e) {
        return res.status(500).json({message: e.message});
    }
}

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);

        const userWithToken = generateToken(user.get({raw: true}));
        userWithToken.user.avatar = user.avatar;

        return res.send(userWithToken);
    } catch(e) {
        return res.status(500).json({message: e.message});
    }
}

const generateToken = (user) => {
    delete user.password;

    const token = jwt.sign(user, config.appKey, {expiresIn: 86400});

    return { ...{user}, ...{ token } };
}