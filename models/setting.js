const mongoose = require('mongoose');

// Creating Schema
const setSchema = mongoose.Schema({
    set_type: { type: String, required: true},
    content: { type: Array },
    user_id: { type: String, required: true }
});

const Setting = module.exports = mongoose.model('Setting', setSchema);

module.exports.add = (add, callback) => {
    add.save(callback);
};

module.exports.getTo = (query, callback) => {
    Setting.find(query, callback);
};

module.exports.getById = (id, callback) => {
    Setting.findOne({_id:id}, callback);
};

module.exports.getByType = (type, callback) => {
    Setting.findOne({set_type:type}, callback);
};

module.exports.del = (id, callback) => {
    Setting.remove({_id:id}, callback);
};

module.exports.change = (id, data, callback) => {
    const query = {_id:id};
    Setting.update(query, {$set: data}, callback);
}