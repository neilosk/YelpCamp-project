
const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');


async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  console.log("MONGO DATABASE CONNECTED")
}
main().catch(err => console.log(err));

const sample = array => array [Math.floor(Math.random() * array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i = 10; i < 60; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '62d539ee17e815a71c6cb65c',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            image: `https://picsum.photos/id/${i}/900/500`, 
            description: "It's a nice small cottage next to the woods, the sea the land and the air. Fire and rocks are missing though", 
            price
        }) 
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});

