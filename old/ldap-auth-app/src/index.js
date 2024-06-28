const express = require('express');
const bodyParser = require('body-parser');
const ldap = require('ldapjs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const ldapClient = ldap.createClient({
    url: 'ldap://localhost:389'
});

app.listen(3100, () => {
    console.log('Server is running on port 3100');
});


app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    // Create a new LDAP entry
    const newEntry = {
        cn: username,
        sn: username,
        objectClass: ['inetOrgPerson'],
        userPassword: password
    };

    ldapClient.bind('cn=admin,dc=example,dc=com', 'admin_password', (err) => {
        if (err) {
            return res.status(500).send('Error binding to LDAP server');
        }

        ldapClient.add(`cn=${username},ou=users,dc=example,dc=com`, newEntry, (err) => {
            if (err) {
                return res.status(500).send('Error creating new user');
            }

            res.send('User created successfully');
        });
    });
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    ldapClient.bind(`cn=${username},ou=users,dc=example,dc=com`, password, (err) => {
        if (err) {
            return res.status(401).send('Invalid username or password');
        }

        res.send('Login successful');
    });
});
