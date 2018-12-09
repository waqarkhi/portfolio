const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');

router.get('/', (req, res, next) => {
    Skill.getSkills((err, skills) => {
        if(err) { res.json(err);
        } else {res.json(skills);}
    });
});

router.get('/:id', (req, res, next) => {
    Skill.getById(req.params.id,  (err, skill) => {
        if(err) { res.json(err);
        } else {res.json(skill);}
    })
});

router.post('/', (req, res, next) => {
    const input = req.body;
    const skill = new Skill({
        title: input.title,
        list: input.list,
        user_id: input.user_id
    });
    Skill.addSkill(skill, (err, status) => {
        if( err ) { res.json(err); } 
        else { res.json(status); }
    })
});

router.put('/:id', (req, res, next) => {
    const input = req.body;
    const upskill = {};
    if(input.title) { upskill.title = input.title;}
    if(input.list) { upskill.list = input.list;}
    Skill.upskill(req.params.id, upskill, (err, status) => {
        if(err) { res.json(err); } 
        else { res.json(status); }
    });
});

router.delete('/:id', (req, res, next) => {
    Skill.delskill(req.params.id, (err, status) => {
        if(err) { res.json(err); }
        else { res.json(status); }
    })
});

module.exports = router;