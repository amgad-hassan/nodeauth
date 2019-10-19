const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const {mongoURI} = require('./config/db');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();




// Passport Config
require('./config/passport')(passport);

//DB
mongoose.connect(mongoURI,{useUnifiedTopology: true,useNewUrlParser: true }).then((db)=>{
    console.log('connect');


}).catch(error=> console.log(error));

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//body parser
app.use(express.urlencoded({extended: true}));


// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
 
  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


const PORT =  process.env.PORT||5000 ;
 app.listen(PORT,console.log(`run on ${PORT}`));