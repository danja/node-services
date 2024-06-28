import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LdapStrategy } from 'passport-ldapauth';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const LDAP_OPTIONS = {
    server: {
        url: 'ldap://localhost:389',
        bindDN: 'cn=admin,dc=example,dc=com',
        bindCredentials: 'admin_password',
        searchBase: 'ou=users,dc=example,dc=com',
        searchFilter: '(cn={{username}})'
    }
};

passport.use(new LdapStrategy(LDAP_OPTIONS));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
    `);
});

app.post('/login', passport.authenticate('ldapauth', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
