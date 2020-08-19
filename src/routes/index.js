const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

//GET
router.get('/', async (req, res) => {
    const entries = await Entry.find().sort({date: 'desc'});
    res.render('index', {entries});
});

module.exports = router;