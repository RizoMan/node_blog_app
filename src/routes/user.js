const express =  require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

//GET
router.get('/user/signup', (req, res) => {
    res.render('user/signup');
});

router.get('/user/signin', (req, res) => {
    res.render('user/signin');
});

router.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
//POST
router.post('/user/signup', async (req, res) => {
    const {name, userName, email, password, confirm_password} = req.body;
    const errors = [];

    if(name.length < 3){
        errors.push({text: 'Name must be at least 3 characters'});
    }

    if(password != confirm_password){
        errors.push({text: 'Password do not match'});
    }

    if(password.length < 4){
        errors.push({text: 'Password must be at least 4 characters'});
    }

    if(errors.length > 0){
        res.render('user/signup', {errors, name, email, password, confirm_password});
    }else{
        const emailUser = await User.findOne({email: email}) || null;
        if(emailUser){
            req.flash('error_msg', 'Email already in use');
            res.redirect('/user/signup')
        }

        const newUser = new User({name, userName, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/user/signin');
    }

});

router.post('/user/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'user/signin',
    failureFlash: true
}));

module.exports = router;