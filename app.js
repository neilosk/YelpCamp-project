const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');


const {campgroundSchema, reviewSchema} = require('./schemas.js');
const Campground = require('./models/campground');
const Review = require('./models/review');
const User = require('./models/user');



const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users');


async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  console.log("MONGO DATABASE CONNECTED")
}
main().catch(err => console.log(err));

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
//CHECK THIS OUT!!!!!!!////
app.use(bodyParser.urlencoded({extended: true}))
//CHECK THE ABOVE
app.use(express.static(path.join(__dirname, 'public')))


const sessionConfig = {
    secret: 'thisshouldbeabettersecret!', 
    resave:false, 
    saveUninitialized:true, 
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge:  1000 * 60 * 60 * 24 * 7
    } 
}
app.use(session(sessionConfig));
app.use(flash());

//PASSPORT AFTER SESSION CONFIG//
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    // console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/', usersRoutes);
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)


app.get('/', (req,res) =>{
    res.render('home')
})

app.all('*', (req,res,next) =>{
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', {err})
} )

app.listen(3000, () => {
    console.log('Listening on port: 3000')
})


// const validateCampground = (req,res,next) => {
//     const {error} = campgroundSchema.validate(req.body);
//     if(error){
//         console.log(error)
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else{
//         next();
//     }
//     // console.log(result);
// }

// const validateReview = (req,res,next) => {
//     const {error} = reviewSchema.validate(req.body);
//     if(error){
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else{
//         next();
//     }
// }


// app.get('/campgrounds',  catchAsync( async (req,res) =>{
//     const campgrounds = await Campground.find({})
//     res.render('campgrounds/index', {campgrounds})
// }))

// app.get('/campgrounds/new', (req, res) => {
//     res.render('campgrounds/new')
// })


// app.post('/campgrounds',urlencodedParser, validateCampground, catchAsync( async (req, res, next) =>{
//     // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
//     // res.send(req.body)
//     const campground = new Campground(req.body.campground);
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// app.get('/campgrounds/:id',catchAsync( async (req,res) =>{
//     const campground = await Campground.findById(req.params.id).populate('reviews')
//     // console.log(campground);
//     res.render('campgrounds/show', {campground})
// }))

// app.get('/campgrounds/:id/edit', catchAsync( async (req,res) =>{
//     const campground = await Campground.findById(req.params.id)
//     res.render('campgrounds/edit', {campground})
// }))

// app.put('/campgrounds/:id', validateCampground, catchAsync( async(req,res) =>{
//     const {id} = req.params;
//     const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// app.delete('/campgrounds/:id', catchAsync( async(req,res) =>{
//     const {id} = req.params;
//     const campground = await Campground.findByIdAndDelete(id, {...req.body.campground})
//     res.redirect('/campgrounds');

// }))

// app.post('/campgrounds/:id/reviews',urlencodedParser, validateReview, catchAsync(async(req,res)=>{
//     const campground = await Campground.findById(req.params.id);
//     const review = new Review(req.body.review);
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync( async(req,res) =>{
//     const {id, reviewId} = req.params;
//     const campground = await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
//     const review = await Review.findByIdAndDelete(reviewId)
//     res.redirect(`/campgrounds/${id}`);
//     // res.send('Deleted')

// }))

