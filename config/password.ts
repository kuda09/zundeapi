let passport = require('passport');
let LocalStrategy = require('passport-local');
import {user} from "../models/schemas/schemas";

passport.use(new LocalStrategy({usernameField: 'username'}, (username: string, password: string, done) => {

        user.findOne({username: username}, (err: Object, user: Object) => {
            if (err) return done(err);
            if (!user) return done(null, false, {message: 'Incorrect username'});
            //noinspection TypeScriptUnresolvedFunction
            if (!user.validPassword(password)) return done(null, false, {message: 'Incorrect password'});

            return done(null, user);
        })
    }
));

