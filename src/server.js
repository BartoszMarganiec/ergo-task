const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const RequestHandler = require('./Backend/RequestHandler.js');

const app = express()
const port = 3000;

//ENV
require('dotenv').config();

//MIDDLEWARE
app.use(session({secret: 'qgv763EYudVwEcMQNxd2lh', resave: false, saveUninitialized: true, cookie: {maxAge: 60000 }}));
app.use(cookieParser());
app.use(bodyParser.json());

// STATIC
app.use('/js', express.static('dist/js'));

app.use((req, res, next) => {

    if (req.cookies && req.cookies.logged && !req.session.logged) {
        res.clearCookie('logged');
    }
    next();
});

//CONTROLLERS
app.get('/', (req, res) => RequestHandler.serveIndex(req, res));
app.post('/api/search', (req, res) => RequestHandler.searchAction(req, res));
app.get('/api/get-details', (req, res) => RequestHandler.getDetailsAction(req, res));
app.get('/oauth/redirect', (req, res) => RequestHandler.authAction(req, res))
app.get('/logout', (req, res, next) => RequestHandler.logoutAction(req, res, next));

//RUN
app.listen(port, () => console.log(`App listening on port ${port}!`));
