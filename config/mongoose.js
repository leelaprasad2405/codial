const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/codial_development'); // this line is not working below snippet is fine

// connect to database
mongoose.connect('mongodb://localhost/codial_development', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}); // now this line tells that mongoose is connected contact list


const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to Mongo DB"));

db.once('open', function(){
    console.log('connected to database:: mongo DB');
});

module.exports = db;