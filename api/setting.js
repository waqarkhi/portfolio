const express = require('express');
const router = express.Router();
const Setting = require('../models/setting');

router.get('/', (req, res, next) => {
    Setting.getTo((err, result) => {
        if(err) { res.json(err);
        } else {res.json(result);}
    })
});

router.get('/:id', (req, res, next) => {
    Setting.getById(req.params.id,  (err, result) => {
        if(err) { res.json(err);
        } else {res.json(result);}
    })
});

router.get('/type/:type', (req, res, next) => {
    Setting.getByType(req.params.type,  (err, result) => {
        if(err) { res.json(err);
        } else {res.json(result);}
    });
});

router.post('/', (req, res, next) => {
    const input = req.body;
    const setting = new Setting({
        set_type: input.set_type,
        content: input.content,
        user_id: input.user_id
    });
    Setting.add(setting, (err, result) => {
        if( err ) { res.json(err); } 
        else { res.json(result); }
    });
});

router.put('/:id', (req, res, next) => {
    const input = req.body;
    const updata = {};
    if(input.set_type) { updata.set_type = input.set_type;}
    if(input.content) { updata.content = input.content;}
    Setting.change(req.params.id, updata, (err, status) => {
        if(err) { res.json(err); } 
        else { res.json(status); }
    });
});

router.delete('/:id', (req, res, next) => {
    Setting.del(req.params.id, (err, status) => {
        if(err) { res.json(err); }
        else { res.json(status); }
    })
});

module.exports = router;