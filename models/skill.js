const mongoose = require('mongoose');

// Creating Schema
const skillSchema = mongoose.Schema({
    title: { type: String, required: true },
    list: { type: Array },
    user_id: { type: String, required: true }
});

const Skill = module.exports = mongoose.model('Skill', skillSchema);

module.exports.addSkill = (newSkill, callback) => {
    newSkill.save(callback);
};

module.exports.getSkills = (callback) => {
    Skill.find(callback);
};

module.exports.getById = (id, callback) => {
    Skill.findOne({_id:id}, callback);
};

module.exports.delskill = (id, callback) => {
    Skill.remove({_id:id}, callback);
};

module.exports.upskill = (id, skill, callback) => {
    const query = {_id:id};
    Skill.update(query, {$set: skill}, callback);
}