const router = require('express').Router();
const user = require('../models/userModel')

router.route('/').get((req, res) => {
    user.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json({"error": err}));
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const newUser = new user({username})

    newUser.save()
        .then(user => {
            res.json("User added: " + user)
        })
        .catch(err => {
            res.status(400).json("error : "+ err)
        });
});

module.exports = router;