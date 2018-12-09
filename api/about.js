const express = require('express');
const router = express.Router();
const Section = require('../models/section');

router.get('/', (req, res, next) => {
    const query = {section_type: 'about'};
    Section.getSec(query, (err, sections) => {
        if(err) { res.json(err);
        } else {res.json(sections);}
    })
});

router.get('/:id', (req, res, next) => {
    Section.getById(req.params.id,  (err, sections) => {
        if(err) { res.json(err);
        } else {res.json(sections);}
    })
});

router.post('/', (req, res, next) => {
    const input = req.body;
    const section = new Section({
        section_type: 'about',
        title: input.title,
        content: input.content,
        user_id: input.user_id
    });
    Section.addSec(section, (err, sec) => {
        if( err ) {
            res.json(err);
        } else {
            res.json(sec);
        }
    })
});

router.put('/:id', (req, res, next) => {
    const input = req.body;
    const upsec = {};
    if(input.title) { upsec.title = input.title;}
    if(input.content) { upsec.content = input.content;}
    Section.upsec(req.params.id, upsec, (err, status) => {
        if(err) { res.json(err); } 
        else { res.json(status); }
    });
});

router.delete('/:id', (req, res, next) => {
    Section.delsec(req.params.id, (err, status) => {
        if(err) { res.json(err); }
        else { res.json(status); }
    })
});

module.exports = router;