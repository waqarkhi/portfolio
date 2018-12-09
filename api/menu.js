const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');

router.get('/', (req, res, next) => {
    Menu.getMenu((err, menus) => {
        if(err) { res.json(err);
        } else {res.json(menus);}
    });
});

router.get('/:id', (req, res, next) => {
    Menu.getById(req.params.id,  (err, menu) => {
        if(err) { res.json(err);
        } else {res.json(menu);}
    })
});

router.post('/', (req, res, next) => {
    const input = req.body;
    const menu = new Menu({
        title: input.title,
        content: input.content,
        user_id: input.user_id
    });
    Menu.addMenu(menu, (err, status) => {
        if( err ) { res.json(err); } 
        else { res.json(status); }
    })
});

router.put('/:id', (req, res, next) => {
    const input = req.body;
    const upmenu = {};
    if(input.title) { upmenu.title = input.title;}
    if(input.content) { upmenu.content = input.content;}
    Menu.upmenu(req.params.id, upmenu, (err, status) => {
        if(err) { res.json(err); } 
        else { res.json(status); }
    });
});

router.delete('/:id', (req, res, next) => {
    Menu.delmenu(req.params.id, (err, status) => {
        if(err) { res.json(err); }
        else { res.json(status); }
    })
});

module.exports = router;