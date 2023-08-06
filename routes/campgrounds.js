const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const catchAsync = require('../utils/catchAsync');

const Campground = require('../models/campground');

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const campgrounds = require('../controllers/campgrounds');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, urlencodedParser, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampgrounds))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampround))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


module.exports = router;

// router.get('/', catchAsync(campgrounds.index));

// router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// router.post('/', isLoggedIn, urlencodedParser, validateCampground, catchAsync(campgrounds.createCampground));

// router.get('/:id', catchAsync(campgrounds.showCampgrounds));

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampround))

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

// module.exports = router;

//MOVED TO MIDDLEWARE**********************//
// const ExpressError = require('../utils/ExpressError');
// const {campgroundSchema} = require('../schemas.js');

// router.get('/',  catchAsync( async (req,res) =>{
//     const campgrounds = await Campground.find({})
//     res.render('campgrounds/index', {campgrounds})
// }))

// router.get('/new', isLoggedIn, (req, res) => {
//     res.render('campgrounds/new')
// })


// router.post('/', isLoggedIn, urlencodedParser, validateCampground, catchAsync( async (req, res, next) =>{
//     // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
//     // res.send(req.body)
//     const campground = new Campground(req.body.campground);
//     campground.author = req.user._id;
//     await campground.save();
//     req.flash('success', 'Successfully made a new campground!');
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// router.get('/:id', catchAsync( async (req,res) =>{
//     const campground = await Campground.findById(req.params.id).populate({
//         path: 'reviews',
//         populate: {
//             path: 'author'
//         }
//     }).populate('author');
//     // console.log(campground);
//     if(!campground){
//         req.flash('error', 'Cannot find that Campground');
//         res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/show', {campground})
// }))

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync( async (req,res) =>{
//     const {id} = req.params;
//     const campground = await Campground.findById(id)
//     if(!campground){
//         req.flash('error', 'Cannot find that Campground');
//         res.redirect('/campgrounds');
//     }
//     // if (!campground.author.equals(req.user._id)){
//     //     req.flash('error', 'You do not have permission to do that');
//     //     return res.redirect(`/campgrounds/${id}`)
//     // }
//     res.render('campgrounds/edit', {campground})
// }))

// module.exports.updateCampground = async(req,res) =>{
//     const {id} = req.params;
//     // const campground = await Campground.findById(id);
//     // // const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
//     // if (!campground.author.equals(req.user._id)){
//     //     req.flash('error', 'You do not have permission to do that');
//     //     return res.redirect(`/campgrounds/${id}`)
//     // }
//     const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
//     req.flash('success', 'Successfully updated!')
//     res.redirect(`/campgrounds/${campground._id}`)
// }


// router.delete('/:id', isLoggedIn, isAuthor, catchAsync( async(req,res) =>{
//     const { id } = req.params;
//     // const campground = await Campground.findById(id);
//     // if (!campground.author.equals(req.user._id)){
//     //     req.flash('error', 'You do not have permission to do that');
//     //     return res.redirect(`/campgrounds/${id}`)
//     // }
//     await Campground.findByIdAndDelete(id);
//     req.flash('success', 'Successfully deleted campground')
//     res.redirect('/campgrounds');

// }))

