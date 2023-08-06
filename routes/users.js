const express = require('express');
const router = express.Router();
const User = require('../models/user');
const users = require ('../controllers/users');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), users.login)

router.get('/logout',users.logout);

module.exports = router;

// router.get('/register', users.renderRegister );

// router.post('/register', catchAsync(users.register));

// router.get('/login',users.renderLogin);

// router.post('/login',passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), users.login);

// router.get('/logout',users.logout);

// module.exports = router;

// router.get('/logout', function(req, res){
//     req.logout(err => {
//       if (err) return next(err); 
//       req.flash('success', 'Log out successful!')
//       res.redirect('/campgrounds');
//     });
//   });



// router.post('/register', catchAsync( async (req,res, next) =>{
//     try{
//     const {email, username, password} = req.body;
//     const user = new User({email, username});
//     const registeredUser = await User.register(user,password);
//     req.login(registeredUser, err =>{
//         if(err) return next();
//         req.flash('success','Welcome to Yelp Camp!');
//         res.redirect('/campgrounds');
//     })
//     // console.log(registeredUser);
   
//     } catch(e){
//         req.flash('error', e.message);
//         res.redirect('/register');
//     }
// }))

// router.get('/login', (req, res) => {
//     res.render('users/login');
// })

// router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), (req, res) => {
//     req.flash('success', 'Welcome Back!');
//     const redirectUrl = req.session.returnTo || '/campgrounds';
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
// })

// router.get('/logout', (req,res)=>{
//     req.logout();
//     req.flash('success', 'Log out successful')
//     res.redirect('/campgrounds');
// })

// // router.get('/logout', function(req, res){
// //     req.logout(err => {
// //       if (err) return next(err); 
// //       req.flash('success', 'Log out successful!')
// //       res.redirect('/campgrounds');
// //     });
// //   });

// module.exports = router;