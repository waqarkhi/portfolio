const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');

router.get('/', (req, res, next) => {
    Portfolio.getPortfolios((err, Portfolios) => {
        if(err) { res.json(err);
        } else {res.json(Portfolios);}
    });
});

router.get('/:id', (req, res, next) => {
    Portfolio.getById(req.params.id,  (err, portfolio) => {
        if(err) { res.json(err);
        } else {res.json(portfolio);}
    })
});

router.post('/', (req, res, next) => {
    const input = req.body;
    const portfolio = new Portfolio({
        title: input.title,
        type: input.type,
        detail: input.detail,
        user_id: input.user_id
    });
    Portfolio.addPortfolio(portfolio, (err, status) => {
        if( err ) { res.json(err); } 
        else { res.json(status); }
    });
});

router.put('/:id', (req, res, next) => {
    const input = req.body;
    const upPortfolio = {};
    if(input.title) { upPortfolio.title = input.title;}
    if(input.detail) { upPortfolio.detail = input.detail;}
    Portfolio.upPortfolio(req.params.id, upPortfolio, (err, status) => {
        if(err) { res.json(err); } 
        else { res.json(status); }
    });
});

router.delete('/:id', (req, res, next) => {
    Portfolio.delPortfolio(req.params.id, (err, status) => {
        if(err) { res.json(err); }
        else { res.json(status); }
    })
});

module.exports = router;