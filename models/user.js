const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Creating Schema
const userSchema = mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true },
    display_name: { type: String },
    email: { type: String, required: true},
    password: { type: String, required: true }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUsers = (callback) => {
    User.find(callback);
};

module.exports.getById = (id, callback) => {
    User.findOne({_id:id}, callback);
};

module.exports.delById = (id, callback) => {
    User.remove({_id:id}, callback);
};

module.exports.UpdUser = (id, user, callback) => {
    const query = {_id:id};
    User.update(query, {$set: user}, callback);
}