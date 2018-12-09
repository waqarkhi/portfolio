const mongoose = require('mongoose');

// Creating Schema
const secSchema = mongoose.Schema({
    section_type: { type: String, required: true},
    title: { type: String, required: true},
    content: { type: String, required: true },
    user_id: { type: String, required: true }
});

const Section = module.exports = mongoose.model('Section', secSchema);

module.exports.addSec = (newSec, callback) => {
    newSec.save(callback);
};

module.exports.getSec = (query, callback) => {
    Section.find(query, callback);
};

module.exports.getById = (id, callback) => {
    Section.findOne({_id:id}, callback);
};

module.exports.delsec = (id, callback) => {
    Section.remove({_id:id}, callback);
};

module.exports.upsec = (id, sec, callback) => {
    const query = {_id:id};
    Section.update(query, {$set: sec}, callback);
}