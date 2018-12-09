const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get All
router.get('/', (req, res, next) => {
    User.getUsers((err, users) => {
        if(err) { res.json(err); } 
        else { res.json(users); }
    });
});

// Get One
router.get('/:id', (req, res, next) => {
    User.getById(req.params.id, (err, user) => {
        if(err) { res.json(err); } 
        else { res.json(user); }
    });
});

// Delete One
router.delete('/:id', (req, res, next) => {
    User.delById(req.params.id, (err, suc) => {
        if(err) { res.json({error: err}); } 
        else { res.json({success: suc}); }
    });
});


// Add One
router.post('/', (req, res, next) => {
    let input = req.body;
    let newUser = new User({
        first_name: input.first_name,
        last_name: input.last_name,
        display_name: input.display_name,
        email: input.email,
        password: input.password
    });
    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, error: err});
        } else {
            res.json({success: true, user: user})
        }
    });
});

// update One
router.put('/:id', (req, res, next) => {
    let input = req.body;
    const updUser = {};
    if(input.first_name) {updUser.first_name = input.first_name}
    if(input.last_name) {updUser.last_name = input.last_name}
    if(input.display_name) {updUser.display_name = input.display_name}
    if(input.email) {updUser.email = input.email}

    User.UpdUser(req.params.id, updUser, (err, user) => {
        if(err) {
            res.json({success: false, error: err});
        } else {
            res.json({success: true, user: user})
        }
    });
});

module.exports = router;