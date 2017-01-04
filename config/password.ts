let passport = require('passport');
let LocalStrategy = require('passport-local');
import {user} from "../models/schemas/schemas";
let Auth0Strategy = require('passport-auth0');

var auth0Strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.JWT_SECRET,
    callbackURL:  '/' + process.env.AUTH0_CALLBACK
}, function (accessToken, refreshToken, extraParams, profile, done) {

    return done(null, profile);
})


var localStrategy = new LocalStrategy({usernameField: 'username'}, (username: string, password: string, done) => {

        user.findOne({username: username}, (err: Object, user: Object) => {
            if (err) return done(err);
            if (!user) return done(null, false, {message: 'Incorrect username'});
            //noinspection TypeScriptUnresolvedFunction
            if (!user.validPassword(password)) return done(null, false, {message: 'Incorrect password'});

            return done(null, user);
        })
    }
);

passport.use(localStrategy);
passport.use(auth0Strategy);



