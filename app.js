const createError = require('http-errors');
const conn = require('./config/db');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const userModel = require('./models/user-model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const indexRouter = require('./routes/indexRouter');
const signUpRouter = require('./routes/signupRouter');
const signUpPostRouter = require('./routes/signupPostRouter');
const loginRouter = require('./routes/loginRouter');
const loginPostRouter = require('./routes/loginPostRouter');
const createPollRouter = require('./routes/createPollRouter');
const createPollPostRouter = require('./routes/createPollPostRouter');
const googleLoginRouter = require('./routes/googleLoginRouter');
const googleAuthCallback = require('./routes/googleAuthCallbackRputer');
const voteForPostRouter = require('./routes/voteForPostRouter');
const pollDetailsRouter = require('./routes/pollDetailsRouter');
const pollCommentPostRouter = require('./routes/pollCommentPostRouter');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET || "MySecret",
    cookie: { maxAge: 9000000000000 },
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    const user = await userModel.findOne({ email });

    if (!user) return done(null, false, { message: "Incorrect Username or Password" });

    bcrypt.compare(password, user.password, (err, match) => {

        if (err) return done(err);

        if (!match) return done(null, false, { message: "Incorrect Username or Password" });

        return done(null, user);
    })
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, 

async (accessToken, refreshToken, profile, done)=>{
    
    try {
        
        const user = await userModel.findOneAndUpdate({ googleId: profile.id }, {
            name: profile.displayName,
            email: profile.emails[0].value,
        }, {new: true, upsert: true});

        done(null, user)

    } catch (error) {
        done(error, done)
    }

}

))

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {

    const user = await userModel.findOne({ _id: id });
    done(null, user)
});

app.use(flash());

app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/signup', signUpPostRouter);
app.use('/login', loginRouter);
app.use('/login', loginPostRouter);
app.use('/create-poll', createPollRouter);
app.use('/create-poll', createPollPostRouter);
app.use('/auth/google', googleLoginRouter);
app.use('/auth/google/callback', googleAuthCallback);
app.use('/votefor', voteForPostRouter);
app.use('/poll', pollDetailsRouter);
app.use('/post-comment', pollCommentPostRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error', { e1: res.locals.error, e2: res.locals.message });
});

module.exports = app;
