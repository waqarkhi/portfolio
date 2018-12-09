const mongoose = require('mongoose');

// Creating Schema
const pfSchema = mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    detail: { type: Array },
    user_id: { type: String, required: true }
});

const Portfolio = module.exports = mongoose.model('Portfolio', pfSchema);

module.exports.addPortfolio = (newPortfolio, callback) => {
    newPortfolio.save(callback);
};

module.exports.getPortfolios = (callback) => {
    Portfolio.find(callback);
};

module.exports.getById = (id, callback) => {
    Portfolio.findOne({_id:id}, callback);
};

module.exports.delPortfolio = (id, callback) => {
    Portfolio.remove({_id:id}, callback);
};

module.exports.upPortfolio = (id, portfolio, callback) => {
    const query = {_id:id};
    Portfolio.update(query, {$set: portfolio}, callback);
}