
const express = require('express');
const router = express.Router({mergeParams:true});

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const reviews = require ('../controllers/reviews');



const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware');


router.post('/', isLoggedIn, urlencodedParser, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;


//**MOVED TO MIDDLEWARE */
// const {reviewSchema} = require('../schemas.js');
// const Campground = require('../models/campground');
// const Review = require('../models/review');

// const validateReview = (req,res,next) => {
//     const {error} = reviewSchema.validate(req.body);
//     if(error){
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else{
//         next();
//     }
// }



// router.post('/', isLoggedIn, urlencodedParser, validateReview, catchAsync(async(req,res)=>{
//     const campground = await Campground.findById(req.params.id);
//     const review = new Review(req.body.review);
//     review.author = req.user._id;
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     req.flash('success', 'Created new Review!')
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync( async(req,res) =>{
//     const {id, reviewId} = req.params;
//     const campground = await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
//     const review = await Review.findByIdAndDelete(reviewId)
//     req.flash('success', 'Successfully deleted the Review!')
//     res.redirect(`/campgrounds/${id}`);
//     // res.send('Deleted')

// }))

