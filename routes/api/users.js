const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load user model
const User = require('../../models/User');

// @route   GET api/users/test
// @Desc    Tests users route
// @access  Public

router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route   GET api/users/register
// @Desc    Register a user
// @access  Public

router.post('/register', (req, res) => {
    const { email, name, avatar, password } = req.body
    User.findOne({ email })
        .then(user => {
            if(user){
                return res.status(400).json({email: 'Email Already Exists'})
            } else {

                const avatar = gravatar.url(email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                });

                const newUser = new User({
                    name: name,
                    email: email,
                    avatar,
                    password: password
                });

                bcrypt.getSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        });
});

module.exports  = router;