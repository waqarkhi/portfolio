const mongoose = require('mongoose');

// Creating Schema
const menuSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: Array },
    user_id: { type: String, required: true }
});

const Menu = module.exports = mongoose.model('Menu', menuSchema);

module.exports.addMenu = (newSec, callback) => {
    newSec.save(callback);
};

module.exports.getMenu = (query, callback) => {
    Menu.find(query, callback);
};

module.exports.getById = (id, callback) => {
    Menu.findOne({_id:id}, callback);
};

module.exports.delmenu = (id, callback) => {
    Menu.remove({_id:id}, callback);
};

module.exports.upmenu = (id, menu, callback) => {
    const query = {_id:id};
    Menu.update(query, {$set: menu}, callback);
}