const express =  require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const { isAuthenticated } =require('../helpers/auth');

//GET
router.get('/entries', isAuthenticated, async (req, res) => {
    const entries = await Entry.find({ user: req.user.id }).sort({date: 'desc'});
    res.render('entries/all-entries', {entries});
});

router.get('/entries/add', isAuthenticated, (req, res) => {
    res.render('entries/add');
});

router.get('/entries/edit/:id' , isAuthenticated, async (req, res) => {
    const entry = await Entry.findById(req.params.id);
    res.render('entries/edit-entry', {entry});
});

//POST
router.post('/entries/new', isAuthenticated, async (req, res) => {
    const {title, content} = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please, write a title'});
    }

    if(!content){
        errors.push({text: 'Write a content'});
    }

    if(errors.length > 0){
        res.render('entries/add', {
            errors,
            title,
            content
        });
    }else{
        const newEntry = new Entry({title, content});
        newEntry.user = req.user.id;
        if(req.user.userName == 'admin' || req.user.userName == 'Admin'){
            newEntry.userName = 'Admin'
        }else{
            newEntry.userName = req.user.name;
        }
        
        await newEntry.save();
        req.flash('success_msg', 'Entry Added successfully');
        res.redirect('/entries');
    }
});

//PUT
router.put('/entries/edit/:id', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    await Entry.findByIdAndUpdate(req.params.id, {title, content});
    req.flash('success_msg', 'Entry modified successfully');
    res.redirect('/entries')
});

//DELETE
router.delete('/entries/delete/:id', isAuthenticated, async (req,res) => {
    await Entry.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Entry deleted successfully');
    res.redirect('/entries');
});

module.exports = router;