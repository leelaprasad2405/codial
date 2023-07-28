const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded()); // to read the posts
app.use(cookieParser());  // setting the cookie parser

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// // use express router
// app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in db
app.use(session({name : 'codeial',
    // todo change the secret before deployment in product mode

    
    secret : 'blabla',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/codeial_development',
        autoRemove: 'disabled'
    }),
    function(err){
        console.log(err||'connect-mongo-db');
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        //console.log('Error : ', err);
        console.log(`Error in running th server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});

