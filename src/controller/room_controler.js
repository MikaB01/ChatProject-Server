const express = require('express');
const router = express.Router();

const bookshelf = require('../../database');
const Room = bookshelf.model('Rooms');

router.route('/rooms').get(async (req, res) => {
    try {
        const rooms = await new Room().fetchAll();
        res.json(rooms);
    } catch (error) {
        res.json(error);
    }
});

router.route('/rooms').post(async (req, res) => {
    try {
        res.json(await new Room(req.body).save());
    } catch (error) {
        res.json(error);
    }
});

router.route('/rooms/:id').delete(async (req, res) => {
    try {
        res.json(await new Room().where('id', req.params['id']).destroy());
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;